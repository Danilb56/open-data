export const validateForm = (data, setError, setScrollTo) => {
  let scrollTo;

  if (!data.locations.length) {
    setError((prev) => ({
      ...prev,
      locations: 'Нужно выбрать хотя бы одну локацию',
    }));
    scrollTo = 2;
  } else {
    setError((prev) => ({ ...prev, locations: '' }));
  }

  const activeSchedules = Object.values(data.schedules).filter(
    (schedule) => schedule.active,
  );
  if (!activeSchedules.length) {
    setError((prev) => ({
      ...prev,
      schedules: 'Нужно выбрать хотя бы один день',
    }));
    scrollTo = 1;
  } else {
    setError((prev) => ({ ...prev, schedules: '' }));
  }

  activeSchedules.forEach((schedule) => {
    if (!schedule.start || !schedule.end) {
      setError((prev) => ({
        ...prev,
        schedules: 'Нужно выбрать время начала и конца',
      }));
      scrollTo = 1;
      return;
    } else {
      setError((prev) => ({ ...prev, schedules: '' }));
    }

    if (schedule.start > schedule.end) {
      setError((prev) => ({
        ...prev,
        schedules: 'Время начала не может быть больше времени конца',
      }));
      scrollTo = 1;
      return;
    } else {
      setError((prev) => ({ ...prev, schedules: '' }));
    }
  });

  if (!data.name) {
    setError((prev) => ({ ...prev, name: 'Поле обязательно для заполнения' }));
    scrollTo = 0;
  } else {
    setError((prev) => ({ ...prev, name: '' }));
  }

  if (!data.age) {
    setError((prev) => ({ ...prev, age: 'Поле обязательно для заполнения' }));
    scrollTo = 0;
  } else {
    setError((prev) => ({ ...prev, age: '' }));
  }

  setScrollTo(scrollTo);

  if(!scrollTo && scrollTo != 0) return true;
};
