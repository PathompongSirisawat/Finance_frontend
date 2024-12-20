import { Form, Select, Input, InputNumber, Modal } from 'antd';
import { useEffect } from 'react';

export default function EditItem({ isOpen, item, onItemEdited, onCancel }) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen && item) {
            form.setFieldsValue(item);
        }
    }, [isOpen, item, form]);
    const handleFormSubmit = () => {
        form.validateFields().then((formData) => {
            onItemEdited({ ...item, ...formData });
            form.resetFields();
        }).catch((errorInfo) => {
            console.error('Validation Failed:', errorInfo);
        });
    };
    return (
        <Modal
            title="Edit Item"
            open={isOpen}
            onOk={handleFormSubmit}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="type"
                    label="ชนิด :"
                    rules={[{ required: true, message: 'กรุณาเลือกชนิด' }]}
                >
                    <Select
                        allowClear
                        style={{ width: "100px" }}
                        options={[
                            { value: 'income', label: 'รายรับ' },
                            { value: 'expense', label: 'รายจ่าย' },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="จำนวนเงิน :"
                    rules={[{ required: true, message: 'กรุณาระบุจำนวนเงิน' }]}
                >
                    <InputNumber placeholder="จำนวนเงิน" style={{ width: "100px" }} />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="หมายเหตุ :"
                    rules={[{ required: true, message: 'กรุณาระบุหมายเหตุ' }]}
                >
                    <Input placeholder="Note" />
                </Form.Item>
            </Form>
        </Modal>
    );
}