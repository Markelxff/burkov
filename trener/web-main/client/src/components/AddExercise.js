import React, { useState } from 'react';
import axios from 'axios';

const AddExercise = ({ Exercise, setExercises, setErrorMessage, setSuccessMessage }) => {
  const [ExerciseName, setExerciseName] = useState('');
  const [ExerciseType, setExerciseType] = useState('');  // Сложность упражнения будет храниться здесь
  const [ExerciseTime, setExerciseTime] = useState('');

  const handleAddExercise = () => {
    // Проверка всех полей
    if (!ExerciseName || !ExerciseType || !ExerciseTime.trim()) {
      setErrorMessage('Пожалуйста, укажите название, тип и время упражнения');
      return;
    }

    const time = parseInt(ExerciseTime.trim(), 10); // Преобразуем строку в число и обрезаем пробелы
    if (isNaN(time) || time <= 0) {
      setErrorMessage('Время должно быть положительным числом');
      return;
    }

    // Проверка на существование упражнения
    const existingExercise = Exercise.find(exercise => exercise.name === ExerciseName);
    if (existingExercise) {
      setErrorMessage('Упражнение с таким названием уже существует');
      return;
    }

    // Отправка данных на сервер
    axios.post('http://localhost:3001/api/Exercise', { 
      name: ExerciseName, 
      complexity: ExerciseType, 
      time: parseInt(ExerciseTime.trim(), 10) // Убедись, что время передается как число
    })
      .then((response) => {
        setExercises([...Exercise, response.data]);
        setSuccessMessage('Упражнение успешно добавлено');
        setExerciseName('');
        setExerciseType('');
        setExerciseTime('');
        setErrorMessage('');
      })
      .catch(() => setErrorMessage('Ошибка при добавлении упражнения'));
  };

  // Обработчик для ввода только чисел
  const handleTimeInput = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setExerciseTime(e.target.value);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Добавить упражнение</h2>
      
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Название упражнения
        <input
          type="text"
          value={ExerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Сложность упражнения
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
                checked={ExerciseType === String(type)}
                onChange={() => setExerciseType(String(type))}
                style={{ marginRight: '5px' }}
              />
              <label htmlFor={`complexity-${type}`}>{type}</label>
            </div>
          ))}
        </div>
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Время выполнения (в минутах)
        <input
          type="text"
          value={ExerciseTime}
          onChange={handleTimeInput}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleAddExercise}
          disabled={!ExerciseName || !ExerciseType || !ExerciseTime.trim() || isNaN(parseInt(ExerciseTime, 10)) || parseInt(ExerciseTime, 10) <= 0}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Добавить упражнение
        </button>
      </div>
    </div>
  );
};

export default AddExercise;
