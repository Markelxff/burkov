import React, { useState } from 'react';
import axios from 'axios';

const ChangeExerciseComplexity = ({ Exercise, setExercises, setErrorMessage, setSuccessMessage }) => {
  const [selectedExerciseToChange, setSelectedExerciseToChange] = useState('');
  const [newExerciseType, setNewExerciseType] = useState('');

  const handleChangeExerciseComplexity = () => {
    if (!selectedExerciseToChange || !newExerciseType) {
      setErrorMessage('Пожалуйста, выберите упражнение и новый тип');
      return;
    }

    axios.put(`http://localhost:3001/api/Exercise/${selectedExerciseToChange}`, { complexity: newExerciseType })
      .then(() => {
        const updatedExercises = Exercise.map((exercise) =>
          exercise.id === parseInt(selectedExerciseToChange) ? { ...exercise, complexity: newExerciseType } : exercise
        );
        setExercises(updatedExercises);
        setSelectedExerciseToChange('');
        setNewExerciseType('');
        window.location.reload();
        setErrorMessage('');
        setSuccessMessage('Сложность упражнения успешно изменена');
      })
      .catch(() => {
        setErrorMessage('Ошибка при обновлении сложности упражнения');
      });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Изменить тип упражнения</h2>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Выберите упражнение
        <select
          value={selectedExerciseToChange}
          onChange={(e) => setSelectedExerciseToChange(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Выберите упражнение</option>
          {Exercise.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name} ({exercise.complexity})
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Новая сложность упражнения
        <div style={{
          display: 'flex',
          justifyContent: 'center',   // Центрирование по горизонтали
          gap: '10px',                // Расстояние между радиокнопками
          marginBottom: '10px'
        }}>
          {[1, 2, 3, 4, 5].map((type) => (
            <div key={type} style={{ textAlign: 'center' }}>
              <input
                type="radio"
                id={`complexity-${type}`}
                name="complexity"
                value={type}
                checked={newExerciseType === String(type)}
                onChange={() => setNewExerciseType(String(type))}
                style={{ marginRight: '5px' }}
              />
              <label htmlFor={`complexity-${type}`}>{type}</label>
            </div>
          ))}
        </div>
      </label>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleChangeExerciseComplexity}
          disabled={!selectedExerciseToChange || !newExerciseType}
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Обновить тип
        </button>
      </div>
    </div>
  );
};

export default ChangeExerciseComplexity;
