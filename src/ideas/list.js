const ideas = [
  { "done": false, "liked": false, "id": "1", "key": "idea_1", "text": "Сюрпризова вечеря улюбленого ресторану.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "2", "key": "idea_2", "text": "Спільний відпочинок на природі з палатками і барбекю.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "3", "key": "idea_3", "text": "Подарунок у вигляді квітів або букета.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "4", "key": "idea_4", "text": "Вечірка для двох під відкритим небом з гітарою і піснями.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "5", "key": "idea_5", "text": "Спа-день або релаксаційний масаж для двох.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "6", "key": "idea_6", "text": "Романтична прогулянка за містом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "7", "key": "idea_7", "text": "Подарунок у вигляді ручної роботи, наприклад, в'язаного светра або карти.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "8", "key": "idea_8", "text": "Подарунок у вигляді квитків на концерт улюбленого виконавця або подію.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "9", "key": "idea_9", "text": "Знайти старий лист улюбленого та перечитати його разом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "10", "key": "idea_10", "text": "Подарунок-сюрприз з числовим кодом, який потрібно розкрити.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "11", "key": "idea_11", "text": "Пікнік зі свічками і пледами в парку.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "12", "key": "idea_12", "text": "Фотосесія разом для створення спільних спогадів.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "13", "key": "idea_13", "text": "Подарунок у вигляді об'єкта мистецтва (картини, скульптури) від місцевого митця.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "14", "key": "idea_14", "text": "Спільний курс малювання або гончарства.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "15", "key": "idea_15", "text": "Книга з доречними нотками і особистою відомістю на першому аркуші.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "16", "key": "idea_16", "text": "Медове сюрпризне подорож до романтичного місця.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "17", "key": "idea_17", "text": "Подарунок-сюрприз, який може розкриватися поетапно протягом дня.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "18", "key": "idea_18", "text": "Подарунковий сертифікат на заняття чимось новим разом (танці, готування тощо).", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "19", "key": "idea_19", "text": "Відеопроектор для перегляду фільмів під відкритим небом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "20", "key": "idea_20", "text": "Світлодіодна нічна підсвічка для створення атмосфери.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "21", "key": "idea_21", "text": "Книга з посвідченням, що ви відзначили найкращий час разом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "22", "key": "idea_22", "text": "Подарунок у вигляді спільної зоряної карти.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "23", "key": "idea_23", "text": "Місця для вечірніх прогулянок.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "24", "key": "idea_24", "text": "Подарункова кошик з улюбленими делікатесами.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "25", "key": "idea_25", "text": "Вечірка зі свічками і масажем.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "26", "key": "idea_26", "text": "Подарункова книга з фотографіями вашого спільного подорожування.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "27", "key": "idea_27", "text": "Ігри на подарунок, які ви можете грати разом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "28", "key": "idea_28", "text": "Подарунок-квест, який веде до спільного вечора.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "29", "key": "idea_29", "text": "Конструктор для вечірньої розваги.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "30", "key": "idea_30", "text": "Спільний концерт або театральна постановка.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "31", "key": "idea_31", "text": "Романтичний вихідний з відвіданням місць, де ви ще не були.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "32", "key": "idea_32", "text": "Вечірка-сюрприз для дружнього спілкування з друзями і родиною.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "33", "key": "idea_33", "text": "Подарунок-сюрприз з різними маленькими подарунками.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "34", "key": "idea_34", "text": "Відвідування атракціонів або тематичного парку разом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "35", "key": "idea_35", "text": "Курс кулінарії для спільного приготування страв.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "36", "key": "idea_36", "text": "Подарунок-сюрприз зі спільним завданням чи викликом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "37", "key": "idea_37", "text": "Вечір в басейні або при морі.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "38", "key": "idea_38", "text": "Спільний фотокнижка або альбом зі спогадами.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "39", "key": "idea_39", "text": "Концертні квитки на улюбленого виконавця.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "40", "key": "idea_40", "text": "Спільний тематичний костюмований вечір.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "41", "key": "idea_41", "text": "Майстер-клас з чогось цікавого (вино, кава, шоколад, майстерність).", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "42", "key": "idea_42", "text": "Подарунок з унікальною символікою вашого відносин.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "43", "key": "idea_43", "text": "Романтичний квітковий облік вашого житла.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "44", "key": "idea_44", "text": "Подарунковий сертифікат на розкішний відпочинок.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "45", "key": "idea_45", "text": "Спільний день в казковому парку або на атракціонах.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "46", "key": "idea_46", "text": "Подарунок-сюрприз із скринею, що приховує подарунки.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "47", "key": "idea_47", "text": "Подарунок, який допоможе взяти відпустку разом.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "48", "key": "idea_48", "text": "Спільний відпочинок на природі в наметах.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "49", "key": "idea_49", "text": "Підстригання або зміна зачіски для обох.", "type": "", "price_type": "" },
  { "done": false, "liked": false, "id": "50", "key": "idea_50", "text": "Подарунок-сюрприз з гірляндами і кількома листівками.", "type": "", "price_type": "" }
];

export { ideas }