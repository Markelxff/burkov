import React, { useState } from 'react';
import axios from 'axios';

const AddTraining = ({ setErrorMessage }) => {
  const [TrainingName, setTrainingName] = useState('');
  const [TrainingDuration, setVariantNumber] = useState('');

  const handleAddTraining = () => {
    if (!TrainingName || !TrainingDuration) {
      setErrorMessage('Пожалуйста, укажите название и продолжительность тренировки');
      setTrainingName('');
      setVariantNumber('');
      return;
    }

    // Проверка, чтобы TrainingDuration содержал только цифры
    if (!/^\d+$/.test(TrainingDuration)) {
      setErrorMessage('Продолжительность тренировки должна содержать только положительные цифры');
      setTrainingName('');
      setVariantNumber('');
      return;
    }

    axios
      .post('http://localhost:3001/api/Trainings', {
        name: TrainingName,
        time: TrainingDuration,
      })
      .then(() => {
        setTrainingName('');
        setVariantNumber('');
        setErrorMessage('');
        window.location.reload();
      })
      .catch(() => setErrorMessage('Ошибка при добавлении варианта тренировки'));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Добавить тренировку</h2>
      
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Укажите название тренировки
        <input
          type="text"
          value={TrainingName}
          onChange={(e) => setTrainingName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Продолжительность тренировки
        <input
          type="number"
          value={TrainingDuration}
          onChange={(e) => setVariantNumber(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          min="0"
        />
      </label>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleAddTraining}
          disabled={!TrainingName || !TrainingDuration}
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Добавить вариант тренировки
        </button>
      </div>
    </div>
  );
};

export default AddTraining;
