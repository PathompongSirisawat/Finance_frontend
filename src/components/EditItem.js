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
        form.validateFields()
        form.then((formData) => {
            onItemEdited(formData);
            form.resetFields();
        })
            .catch((errorInfo) => {
                console.error('Validation Failed:', errorInfo);
            });
    };
    return (
        <Modal
            title="Edit Item"
            open={isOpen}
            onOk={handleFormSubmit} // Submit form when pressing OK
            onCancel={() => {
                form.resetFields(); // Reset fields when modal is closed
                onCancel(); // Notify parent about the cancel action
            }}
        >
            <Form
                form={form} // Bind form instance
                layout="vertical"
            >
                <Form.Item
                    name="type"
                    label="ชนิด :"
                    rules={[{ required: true, message: 'กรุณาเลือกชนิด' }]}
                >
                    <Select
                        allowClear
                        style={{ width: "100%" }}
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
                    <InputNumber placeholder="จำนวนเงิน" style={{ width: "100%" }} />
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