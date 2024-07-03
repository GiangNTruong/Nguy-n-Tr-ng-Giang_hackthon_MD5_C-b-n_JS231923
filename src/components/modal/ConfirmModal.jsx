import React from 'react';
import { Modal } from 'antd';

export default function ConfirmModal({ modalVisible, setModalVisible, confirmDelete, jobName }) {
  return (
    <Modal
      title="Xác nhận xóa"
      open={modalVisible}
      onOk={confirmDelete}
      onCancel={() => setModalVisible(false)}
      okText="Đồng ý"
      cancelText="Hủy"
    >
      <p>Bạn có chắc chắn muốn xóa công việc <strong>{jobName} </strong> này ?</p>
    </Modal>
  );
}