import {useContext, useMemo, useEffect} from "react";
import {Button, Form, Input, Popconfirm, Tabs} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import TabContent from "./TabContent";
import {FormContext} from "@/context/FormProvider.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, setRemovedTabs } from "@/redux-slice/productSlice";
import { productServices } from "@/services/product/product_services";


function getRandomInteger(min : number, max : number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function EditableTabs(props : any) {
    const form : any = useContext(FormContext);
    const {tabs , setTabs, activeKey, setActiveKey} = props;
    const {productTabs, tabContents} = useSelector((state : any) => state.productSlice);
    const dispatch = useDispatch();

    


    useEffect(() => {
        if(productTabs.length === 0) return;

        setTabs(productTabs);
        setActiveKey(productTabs[0].key)

    },[productTabs])
    

    function addTab() {
        const newKey = `newProductTabCode${getRandomInteger(1, 20000)}`;
        const newName = `New Tab`;
        setTabs([...tabs, {key: newKey, title: newName}]);
        setActiveKey(newKey);
    };

    function removeTab(targetKey : any) {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        tabs.forEach((tab : any, index : number) => {
            if (tab.key === targetKey) {
                lastIndex = index - 1;
                dispatch(setRemovedTabs(tab.id || null))
            }
        });
        const newTabs = tabs.filter((tab : any) => tab.key !== targetKey);
        if (newTabs.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newTabs[lastIndex].key;
            } else {
                newActiveKey = newTabs[0].key;
            }
        }
        setTabs(newTabs);
        setActiveKey(newActiveKey);
    }

    function handleTabtitleChange(e : any, key : any, isChange = false) {
        const newTabs = tabs.map((tab : any) => {
            if (tab.key === key) {
                return {...tab, title: e.target.value, isEditing: isChange};
            }
            return tab;
        });
        setTabs(newTabs);
    }

    function toggleEdit(key : any, isEditing : boolean) {
        const newTabs = tabs.map((tab : any) => {
            if (tab.key === key) {
                return {...tab, isEditing};
            }
            return tab;
        });
        setTabs(newTabs);
    }

    function handleKeyDown(event : any) {
        if (event.key === " ") event.stopPropagation();
    }



    const items = useMemo(() => {
        return tabs.map((tab : any) => ({
            label: tab.isEditing ? (
                <Input
                    autoFocus
                    defaultValue={tab.title}
                    onBlur={() => toggleEdit(tab.key, false)}
                    onKeyDown={handleKeyDown}
                    onPressEnter={(e) => {
                        handleTabtitleChange(e, tab.key);
                    }}
                />
            ) : (
                <span onDoubleClick={() => toggleEdit(tab.key, true)}>{tab.title}</span>
            ),
            key: tab.key,
            closable: tab.key !== "productCode0",
            children: <TabContent tabContents={tabContents} key={tab.key} tabKey={tab.key}/>,
            closeIcon: (
                <Popconfirm
                    title="Bạn có chắc chắn muốn đóng tab này không?"
                    onConfirm={() => removeTab(tab.key)}
                    okText="Có"
                    cancelText="Không"
                    placement="bottomLeft"
                >
                    <CloseOutlined/>
                </Popconfirm>
            ),
        }));
    }, [tabs]);

    return (
        <Form layout="vertical" form={form}>
            <Tabs
                items={items}
                type="editable-card"
                onChange={setActiveKey}
                activeKey={activeKey}
                onEdit={(targetKey, action) => {
                    if (action === "add") addTab();
                }}
            />
            {/* <Button
                onClick={() =>
                    form.setFieldsValue({
                        tabContentproductCode0: [
                            {
                                title: "test",
                                content: "new",
                                tabContentId: 1,
                                type: "textarea",
                            },
                        ],
                    })
                }
            >
                Set Field
            </Button> */}
        </Form>
    );
}

export default EditableTabs;
