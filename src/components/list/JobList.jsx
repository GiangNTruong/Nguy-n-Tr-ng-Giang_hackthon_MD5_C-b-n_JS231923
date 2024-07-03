import React from 'react';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function JobList({ jobs, completedCount, handleEdit, handleDelete, toggleComplete }) {
  const allCompleted = jobs.length > 0 && completedCount === jobs.length;

  return (
    <div>
      <ul className="list-group">
        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 font-bold">No Data</div>
        ) : (
          jobs.map((job, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center flex justify-between">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={job.completed}
                  onChange={() => toggleComplete(index)}
                  className="mr-2"
                />
                <span className={job.completed ? 'line-through' : ''}>{job.name}</span>
              </div>
              <div>
                <EditOutlined onClick={() => handleEdit(index)} style={{ color: 'orange', marginRight: '10px' }} />
                <DeleteOutlined onClick={() => handleDelete(index)} style={{ color: 'red' }} />
              </div>
            </li>
          ))
        )}
      </ul>
      {allCompleted ? (
        <div className="text-green-500 font-bold text-center "><CheckCircleOutlined className='bg-green-400 text-white text-[24px] rounded-2xl' />Hoàn thành công việc!</div>
      ) : (
        <div className="text-gray-500">Số công việc đã hoàn thành: {completedCount} / {jobs.length}</div>
      )}
    </div>
  );
}