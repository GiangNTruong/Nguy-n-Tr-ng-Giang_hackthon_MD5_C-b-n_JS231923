import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import JobList from './components/list/JobList';
import ConfirmModal from './components/modal/ConfirmModal';
import './index.css';

export default function App() {
  const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);
  const [jobName, setJobName] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobToDeleteName, setJobToDeleteName] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
    const completedJobs = jobs.filter(job => job.completed);
    setCompletedCount(completedJobs.length);
  }, [jobs]);

  const handleAdd = () => {
    if (jobName.trim() === '') {
      alert('Tên công việc không được để trống');
      return;
    }
    if (editIndex !== null) {
      const updatedJobs = jobs.map((job, index) => (index === editIndex ? { ...job, name: jobName } : job));
      setJobs(updatedJobs);
      setEditIndex(null);
    } else {
      setJobs([...jobs, { name: jobName, completed: false }]);
    }
    setJobName('');
    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    setJobToDelete(index);
    setJobToDeleteName(jobs[index].name);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    setJobs(jobs.filter((_, index) => index !== jobToDelete));
    setModalVisible(false);
  };

  const handleEdit = (index) => {
    setJobName(jobs[index].name);
    setEditIndex(index);
    inputRef.current.focus();
  };

  const toggleComplete = (index) => {
    const updatedJobs = jobs.map((job, i) => (i === index ? { ...job, completed: !job.completed } : job));
    setJobs(updatedJobs);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách công việc</h1>
      <div className="flex mb-4">
        <Input
          ref={inputRef}
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          className="flex-1 mr-2"
          placeholder="Nhập tên công việc"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          {editIndex !== null ? 'Cập nhật' : 'Thêm'}
        </button>
      </div>
      <JobList
        jobs={jobs}
        completedCount={completedCount}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
      />
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        confirmDelete={confirmDelete}
        jobName={jobToDeleteName}
      />
    </div>
  );
}