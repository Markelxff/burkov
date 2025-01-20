import React, { useState } from 'react';
import axios from 'axios';

const DeleteExercise = ({ Exercise, setExercises, setErrorMessage, setSuccessMessage }) => {
  const [selectedExerciseToDelete, setSelectedExerciseToDelete] = useState('');

  const handleDeleteExercise = () => {
    if (!selectedExerciseToDelete) {
      setErrorMessage('Пожалуйста, выберите упражнение');
      return;
    }

    axios.delete(`http://localhost:3001/api/deleteExercise/${selectedExerciseToDelete}`)
      .then(() => {
        const updatedExercise = Exercise.filter(exercise => exercise.id !== parseInt(selectedExerciseToDelete));
        setExercises(updatedExercise);
        setSelectedExerciseToDelete('');
        setErrorMessage('');
        setSuccessMessage('Упражнение удалено');
      })
      .catch(() => {
        setErrorMessage('Ошибка при удалении');
      });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '100px' }}>
      <h2>Удалить упражнение</h2>

      <div>
        {Exercise.map((exercise) => (
          <div key={exercise.id} style={{ marginBottom: '10px' }}>
            <input
              type="radio"
              id={`delete-${exercise.id}`}
              name="deleteExercise"
              value={exercise.id}
              checked={selectedExerciseToDelete === String(exercise.id)}
              onChange={() => setSelectedExerciseToDelete(String(exercise.id))}
              style={{ marginRight: '5px' }}
            />
            <label htmlFor={`delete-${exercise.id}`}>{exercise.name}</label>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleDeleteExercise}
          disabled={!selectedExerciseToDelete}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default DeleteExercise;
