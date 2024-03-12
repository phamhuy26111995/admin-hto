package com.hto.admin.config;


import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {


    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                .setPropertyCondition(context ->
                        context.getSource() != null);

        return modelMapper;
    }

//    @Bean
//    public Drive googleDriveService() throws IOException, GeneralSecurityException, IOException {
//        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
//        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
//
//        java.io.File tokenFolder = new java.io.File("tokens");
//        if (!tokenFolder.exists()) {
//            tokenFolder.mkdirs(); // Tạo thư mục nếu nó chưa tồn tại.
//        }
//        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8080).build();
//        ClassPathResource classPathResource = new ClassPathResource("keys/client_secret_1054909593668-b0dlqia9qg27k20kuspaedf7v7n4ffrr.apps.googleusercontent.com.json");
//        // Load client secrets
//        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(jsonFactory,
//                new InputStreamReader(classPathResource.getInputStream()));
//
//        // Build flow and trigger user authorization request.
//        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
//                httpTransport, jsonFactory, clientSecrets, Collections.singleton(DriveScopes.DRIVE))
//                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File("tokens")))
//                .setAccessType("offline")
//                .build();
//
//        Credential credential = new AuthorizationCodeInstalledApp(
//                flow, receiver).authorize("user");
//
//        return new Drive.Builder(httpTransport, jsonFactory, credential)
//                .setApplicationName("Spring Boot Google Drive Example")
//                .build();
//    }
}
