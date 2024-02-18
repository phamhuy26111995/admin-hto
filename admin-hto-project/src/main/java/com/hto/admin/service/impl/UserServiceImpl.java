package com.hto.admin.service.impl;

import com.hto.admin.consts.Role;
import com.hto.admin.consts.UserStatus;
import com.hto.admin.dto.*;
import com.hto.admin.entity.UserEntity;
import com.hto.admin.repository.IUserRepository;
import com.hto.admin.repository.UserRepository;
import com.hto.admin.security.JwtUtilities;
import com.hto.admin.service.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final AuthenticationManager authenticationManager;
    private final IUserRepository iUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilities jwtUtilities;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private UserPermissionService userPermissionService;
    @Autowired
    private UserGroupService userGroupService;
    @Autowired
    private CloudinaryService cloudinaryService;

    @Override
    public List<UserDTO> getAllUser() {
        return userRepository.getAllUser();
    }

    @Override
    public UserDTO getUserById(long id) {
        UserEntity userEntity = userRepository.findById(id).isPresent() ? userRepository.findById(id).get() : null;

        if (userEntity == null) return new UserDTO();

        UserDTO dto = new UserDTO();

        modelMapper.map(userEntity, dto);

        dto.setUserPermission(permissionService.getPermissionByUser(userEntity.getId()));

        return dto;
    }

    @Override
    public UserDTO getUserAdmin() {
        List<UserDTO> userDTOS = userRepository.getUserAdmin();

        if (!userDTOS.isEmpty()) {
            UserDTO userDTO = userDTOS.get(0);

            List<PermissionDTO> userPermission = permissionService.getPermissionByUser(userDTO.getId());

            userDTO.setUserPermission(userPermission);

            return userDTO;
        }
        return new UserDTO();
    }

    @Override
    public UserDTO getUserByUserName(String username) {
        String usernameParam = username;

        if (username.equals("token")) {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            usernameParam = userDetails.getUsername();
        }

        List<UserDTO> userDTOS = userRepository.getUserByUserName(usernameParam);

        if (!userDTOS.isEmpty()) {
            UserDTO userDTO = userDTOS.get(0);

            List<PermissionDTO> userPermission = permissionService.getPermissionByUser(userDTO.getId());

            userDTO.setUserPermission(userPermission);

            return userDTO;
        }
        return null;
    }

    @Override
    public List<UserDTO> getUserByFilter(UserRequestDTO requestDTO) {
        return userRepository.getUserByFilter(requestDTO);
    }

    @Override
    public long createUser(UserRequestDTO requestDTO, MultipartFile image) {
        try {
            UserEntity entity = new UserEntity();
            modelMapper.map(requestDTO, entity);
            entity.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
            String imageUrl = cloudinaryService.uploadFile(image);
            if (StringUtils.isNotEmpty(imageUrl)) {
                entity.setImage(imageUrl);
                UserEntity savedEntity = userRepository.save(entity);
                userPermissionService.save(requestDTO.getAddedPermission(), savedEntity.getId());
                return savedEntity.getId();
            }
//        userGroupService.save(requestDTO.getAddedGroup(), requestDTO.getId());


            return 0;

        } catch (Exception e) {
            throw new RuntimeException();
        }


    }

    @Override
    public long updateUser(UserRequestDTO requestDTO, MultipartFile newImage) {
        Optional<UserEntity> optional = userRepository.findById(requestDTO.getId());

        if (optional.isEmpty()) return 0;

        UserEntity entity = optional.get();

        modelMapper.map(requestDTO, entity);

        if (newImage != null) {
            String imageUrl = cloudinaryService.uploadFile(newImage);

            if (StringUtils.isNotEmpty(imageUrl)) entity.setImage(imageUrl);
        }

        if (requestDTO.getPassword() != null) entity.setPassword(passwordEncoder.encode(requestDTO.getPassword()));

        userPermissionService.update(requestDTO.getRemovedPermission()
                , requestDTO.getAddedPermission()
                , entity.getId());
//        userGroupService.update(requestDTO.getRemovedGroup(), requestDTO.getAddedGroup(), entity.getId());

        return userRepository.save(entity).getId();
    }

    @Override
    public void deleteUser(long id) {
        Optional<UserEntity> optional = userRepository.findById(id);

        optional.ifPresent(userEntity -> {
            userEntity.setDeleted(true);
            userRepository.save(userEntity);
        });
    }


    @Override
    public String authenticate(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserEntity user = iUserRepository.findByUsernameAndStatus(authentication.getName(), UserStatus.ACTIVE.name()).orElseThrow(() -> new UsernameNotFoundException("Người dùng đã bị ngưng hoạt động hoặc sai username password"));
        return jwtUtilities.generateToken(user.getUsername());
    }

    @Override
    public String fakeLogin(LoginDto loginDto) {
        if (!loginDto.getUsername().equals("admin")
                || !loginDto.getPassword().equals("admin")) return "LOGIN_FAILED";

        return "fake_token";
    }

    @Override
    public Optional<UserEntity> findUserByUsername(String username) {
        return iUserRepository.findByUsernameAndStatus(username, UserStatus.ACTIVE.name());
    }

    @Override
    public void changePassword(LoginDto loginDto) {

        if (StringUtils.isEmpty(loginDto.getPassword())) return;

        UserEntity userEntity = validateChangePassword(loginDto);

        String encodedPassword = passwordEncoder.encode(loginDto.getPassword());

        userEntity.setPassword(encodedPassword);

        iUserRepository.save(userEntity);

    }

    @Override
    public void updateProfile(UserRequestDTO requestDTO, MultipartFile newImage) {
        Optional<UserEntity> optional = userRepository.findById(requestDTO.getId());

        if (optional.isEmpty()) throw new RuntimeException("User not found");

        UserEntity entity = optional.get();

        modelMapper.map(requestDTO, entity);

        if (newImage != null) {
            String imageUrl = cloudinaryService.uploadFile(newImage);

            if (StringUtils.isNotEmpty(imageUrl)) entity.setImage(imageUrl);
        }

        if (requestDTO.getPassword() != null) entity.setPassword(passwordEncoder.encode(requestDTO.getPassword()));

        userRepository.save(entity);

    }

    private UserEntity validateChangePassword(LoginDto loginDto) {
        Optional<UserEntity> optional = iUserRepository.findByUsernameAndStatus(loginDto.getUsername(), UserStatus.ACTIVE.name());

        if (optional.isEmpty()) throw new RuntimeException();
        UserEntity userEntity = optional.get();

        CustomUserDetails currentUserLogin = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (currentUserLogin.getRole().equals(Role.ROLE_ADMIN.name())
                && userEntity.getRole().equals(Role.ROLE_ROOT.name()))
            throw new RuntimeException();

        if (currentUserLogin.getRole().equals(Role.ROLE_ADMIN.name())
                && userEntity.getRole().equals(Role.ROLE_ADMIN.name())
                && (!userEntity.getUsername().equals(currentUserLogin.getUsername()))
        )
            throw new RuntimeException();

        if (currentUserLogin.getRole().equals(Role.ROLE_EMPLOYEE.name())
                && (!userEntity.getRole().equals(Role.ROLE_EMPLOYEE.name()) || currentUserLogin.getUsername().equals(userEntity.getUsername()))
        )
            throw new RuntimeException();


        return userEntity;

    }
}
