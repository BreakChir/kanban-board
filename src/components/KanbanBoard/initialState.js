export const initialState = {
  columns: {
    0: {
      title: 'План на месяц',
      cards: [
        { id: 0, value: 'Пройти курс по React' },
        { id: 1, value: 'Отметить день рождения' },
        { id: 2, value: 'Записаться на курсы английского языка, чтобы уехать жить в Лондон' },
        { id: 3, value: 'Сделать бекенд своего сайта на node.js' }
      ]
    },
    1: {
      title: 'Планы на день',
      cards: [
        { id: 4, value: 'Собрать портфолио' },
        {
          id: 5,
          value:
            'Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим.'
        },
        { id: 6, value: 'Забронировать тир на субботу' },
        { id: 7, value: 'Написать первую статью' },
        { id: 8, value: 'Уйти в отпуск' },
        { id: 9, value: 'Вернуться с отпуска' }
      ]
    }
  }
};