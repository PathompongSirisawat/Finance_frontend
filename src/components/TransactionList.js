import React from "react"
import { Button, Table, Space, Tag, Popconfirm, Modal } from "antd"
import { DeleteOutlined, BugOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { useState } from 'react';
import EditItem from './EditItem';

export default function TransactionList(props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleItemEdited = (updatedItem) => {
    props.onEditItem(updatedItem); 
    setIsEditModalOpen(false);
  };
  

  const columns = [
    {
      title: "Date-Time",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm")
    },
    {
      title: "Type", dataIndex: "type", key: "type", render: (_, record) => (
        <Tag color={record.type === "income" ? 'green' : 'red'}>{record.type}</Tag>
      )
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Note", dataIndex: "note", key: "note" },
    {
      title: "Action", key: "action", render: (_, record) => (
        <Space size="middle">

          <Button
            type="primary"
            shape="square"
            icon={<EditOutlined />}
            style={{ backgroundColor: '#B19CD8' ,
              border: '2px solid #9379C2', 
              borderRadius: '4px',
              color: '#FFFFFF'
            }}
            onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <EditItem
            isOpen={isEditModalOpen}
            item={currentItem}
            onItemEdited={handleItemEdited}
            onCancel={() => setIsEditModalOpen(false)}/>


          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => props.onRowDeleted(record.id)}
          >
            <Button 
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />} 
              style={{ backgroundColor: '#FF3333',
                border: '2px solid #E40321',
                color: '#FFCCCC',
                width: '35px', 
                height: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}/>
              
          </Popconfirm>
          <Button
            type="primary"
            shape="circle"
            icon={<BugOutlined />}
            style={{ backgroundColor: '#3795BD',
              border: '2px solid #146C94',
              color: '#CFE0EB',
              width: '35px', 
              height: '35px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => {
              Modal.info({
                title: "Debug",
                content: JSON.stringify(record)
              })
            }} />
        </Space >
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={props.data} />
    </>
  )
}
