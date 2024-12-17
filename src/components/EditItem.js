import { Button, Form, Select, Input, InputNumber, Space, Modal } from 'antd';
export default function EditItem(props) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen && item) {
            form.setFieldsValue(item);
        }
    }, [isOpen, item, form]);
    const handleFormSubmit = () => {
        form.validateFields()
        form.then((formData) => {
                onItemEdited(formData); // ส่งข้อมูลกลับไปให้ App.js เพื่อ Update บน Server
                form.resetFields(); // ล้างค่าในฟอร์ม
            })
            .catch((errorInfo) => {
                console.error('Validation Failed:', errorInfo);
            });
    };
    return (
        <Modal
            title="Edit Item"
            open={isOpen}
            onOk={handleFormSubmit} // เรียกฟังก์ชัน handleFormSubmit เมื่อกดปุ่ม OK
            onCancel={() => {
                form.resetFields(); // ล้างค่าในฟอร์มเมื่อปิด Modal
                onCancel();
            }}
        >
            <Form
                layout="vertical"
                onFinish={props.onItemAdded}
            >
                <Form.Item
                    name="type"
                    label="ชนิด :"
                    rules={[{ required: true }]}
                >
                    <Select
                        allowClear
                        style={{ width: "100px" }}
                        options={[
                            {
                                value: 'income',
                                label: 'รายรับ',
                            },
                            {
                                value: 'expense',
                                label: 'รายจ่าย',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="จำนวนเงิน :"
                    rules={[{ required: true }]}>
                    <InputNumber placeholder="จำนวนเงิน" />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="หมายเหตุ :"
                    rules={[{ required: true }]}>
                    <Input placeholder="Note" />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button htmlType="button" onClick={() => form.resetFields()}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}