import { cardRepository } from '#core/repositories/card.js';
import { likeRepository } from '#core/repositories/like.js';
import { userRepository } from '#core/repositories/user.js';
import { getDistanceInMeters } from '#utils/distance.js';
import { timeToMin } from '#utils/timeToMin.js';

class UserController {
  async createCard(req, res) {
    const userId = req.ctx.sub;
    const { schedules, locations, ...rest } = req.body;
    await userRepository.updateUser(userId, {
      ...rest,
      age: Number(rest.age),
    });

    const createdCard = await userRepository.createCard(userId, {
      schedules,
      locations,
    });

    res.json(createdCard).status(201);
  }

  async getProfile(req, res) {
    const userId = req.ctx.sub;
    const user = await userRepository.findUserById(userId);
    const card = await cardRepository.getCardByAuthorId(userId);
    res.json({ user, card }).status(200);
  }

  async getContacts(req, res) {
    const userId = req.ctx.sub;

    const userCard = await cardRepository.getCardByAuthorId(userId);
    const cards = await cardRepository.getCardsWhoLikedWithContacts(userId);
    const userLikes = await likeRepository.getUserLikes(userId);
    const userDislikes = await likeRepository.getUserDislikes(userId);

    const normalizedLocation = userCard.SportsObject_CardAddedObjects.reduce(
      (location, sportsObj, index, arr) => {
        return {
          x: location.x + sportsObj.location.x / arr.length,
          y: location.y + sportsObj.location.y / arr.length,
        };
      },
      { x: 0, y: 0 },
    );

    const days = userCard.schedules.map((schedule) => schedule.dayOfWeek);
    let maxDistance = 0;

    const scoredCards = cards
      .filter((card) => userLikes.find((like) => like.cardId === card.id))
      .map((card) => {
        const distances = card.SportsObject_CardAddedObjects.reduce(
          (arr, sportsObj) => {
            const distance = getDistanceInMeters(
              normalizedLocation.y,
              normalizedLocation.x,
              sportsObj.location.y,
              sportsObj.location.x,
            );
            if (distance > maxDistance) maxDistance = distance;
            return [...arr, distance];
          },
          [],
        ).sort((a, b) => a - b);

        const overlappingSchedules = card.schedules
          .map((schedule) => {
            if (!days.includes(schedule.dayOfWeek))
              return { ...schedule, overlap: 0 };
            const userSchedule = userCard.schedules.find(
              (userSchedule) => userSchedule.dayOfWeek === schedule.dayOfWeek,
            );

            const overlapStart = Math.max(
              timeToMin(userSchedule.startTime),
              timeToMin(schedule.startTime),
            );
            const overlapEnd = Math.min(
              timeToMin(userSchedule.endTime),
              timeToMin(schedule.endTime),
            );

            if (overlapStart < overlapEnd) {
              return { ...schedule, overlap: overlapEnd - overlapStart };
            } else return { ...schedule, overlap: 0 };
          })
          .sort((a, b) => b.overlap - a.overlap);

        return {
          ...card,
          distances: distances.map((distance) => {
            if (distance / 1000 > 1)
              return (distance / 1000).toFixed(2) + ' км';
            return Math.round(distance) + ' м';
          }),
          schedules: overlappingSchedules.sort((a, b) => {
            const days = [
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ];
            return days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek);
          }),
        };
      })
      .sort((a, b) => b.score - a.score);
    res.json(scoredCards).status(200);
  }

  async getLikes(req, res) {
    const userId = req.ctx.sub;

    const userCard = await cardRepository.getCardByAuthorId(userId);
    const cards = await cardRepository.getCardsWhoLiked(userId);
    const userLikes = await likeRepository.getUserLikes(userId);
    const userDislikes = await likeRepository.getUserDislikes(userId);

    const normalizedLocation = userCard.SportsObject_CardAddedObjects.reduce(
      (location, sportsObj, index, arr) => {
        return {
          x: location.x + sportsObj.location.x / arr.length,
          y: location.y + sportsObj.location.y / arr.length,
        };
      },
      { x: 0, y: 0 },
    );

    const days = userCard.schedules.map((schedule) => schedule.dayOfWeek);
    let maxDistance = 0;

    const scoredCards = cards
      .filter(
        (card) =>
          card.id !== userCard.id &&
          !userLikes.find((like) => like.cardId === card.id) &&
          !userDislikes.find((dislike) => dislike.cardId === card.id),
      )
      .map((card) => {
        const distances = card.SportsObject_CardAddedObjects.reduce(
          (arr, sportsObj) => {
            const distance = getDistanceInMeters(
              normalizedLocation.y,
              normalizedLocation.x,
              sportsObj.location.y,
              sportsObj.location.x,
            );
            if (distance > maxDistance) maxDistance = distance;
            return [...arr, distance];
          },
          [],
        ).sort((a, b) => a - b);

        const overlappingSchedules = card.schedules
          .map((schedule) => {
            if (!days.includes(schedule.dayOfWeek))
              return { ...schedule, overlap: 0 };
            const userSchedule = userCard.schedules.find(
              (userSchedule) => userSchedule.dayOfWeek === schedule.dayOfWeek,
            );

            const overlapStart = Math.max(
              timeToMin(userSchedule.startTime),
              timeToMin(schedule.startTime),
            );
            const overlapEnd = Math.min(
              timeToMin(userSchedule.endTime),
              timeToMin(schedule.endTime),
            );

            if (overlapStart < overlapEnd) {
              return { ...schedule, overlap: overlapEnd - overlapStart };
            } else return { ...schedule, overlap: 0 };
          })
          .sort((a, b) => b.overlap - a.overlap);

        return {
          ...card,
          distances: distances.map((distance) => {
            if (distance / 1000 > 1)
              return (distance / 1000).toFixed(2) + ' км';
            return Math.round(distance) + ' м';
          }),
          schedules: overlappingSchedules.sort((a, b) => {
            const days = [
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ];
            return days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek);
          }),
        };
      })
      .sort((a, b) => b.score - a.score);
    res.json(scoredCards).status(200);
  }

  async getCards(req, res) {
    const userId = req.ctx.sub;

    const user = await userRepository.findUserById(userId);
    const userCard = await cardRepository.getCardByAuthorId(userId);
    const cards = await cardRepository.getAll();

    const userLikes = await likeRepository.getUserLikes(userId);
    const userDislikes = await likeRepository.getUserDislikes(userId);
    const whoDislikedCard = await likeRepository.whoDislikedCard(userCard.id);
    const whoLikedCard = await likeRepository.whoLikedCard(userCard.id);

    const normalizedLocation = userCard.SportsObject_CardAddedObjects.reduce(
      (location, sportsObj, index, arr) => {
        return {
          x: location.x + sportsObj.location.x / arr.length,
          y: location.y + sportsObj.location.y / arr.length,
        };
      },
      { x: 0, y: 0 },
    );

    const days = userCard.schedules.map((schedule) => schedule.dayOfWeek);
    let maxDistance = 0;

    const scoredCards = cards
      .filter(
        (card) =>
          card.id !== userCard.id &&
          !userLikes.find((like) => like.cardId === card.id) &&
          !userDislikes.find((dislike) => dislike.cardId === card.id) &&
          !whoDislikedCard.find(
            (dislike) => dislike.userId === card.author.id,
          ) &&
          !whoLikedCard.find((like) => like.userId === card.author.id),
      )
      .map((card) => {
        let score = 0;
        const ageDiff = Math.abs(user.age - card.author.age);
        const distances = card.SportsObject_CardAddedObjects.reduce(
          (arr, sportsObj) => {
            const distance = getDistanceInMeters(
              normalizedLocation.y,
              normalizedLocation.x,
              sportsObj.location.y,
              sportsObj.location.x,
            );
            if (distance > maxDistance) maxDistance = distance;
            return [...arr, distance];
          },
          [],
        ).sort((a, b) => a - b);

        const overlappingSchedules = card.schedules
          .map((schedule) => {
            if (!days.includes(schedule.dayOfWeek))
              return { ...schedule, overlap: 0 };
            const userSchedule = userCard.schedules.find(
              (userSchedule) => userSchedule.dayOfWeek === schedule.dayOfWeek,
            );

            const overlapStart = Math.max(
              timeToMin(userSchedule.startTime),
              timeToMin(schedule.startTime),
            );
            const overlapEnd = Math.min(
              timeToMin(userSchedule.endTime),
              timeToMin(schedule.endTime),
            );

            if (overlapStart < overlapEnd) {
              return { ...schedule, overlap: overlapEnd - overlapStart };
            } else return { ...schedule, overlap: 0 };
          })
          .sort((a, b) => b.overlap - a.overlap);

        score =
          (1 - ageDiff / 10) * 30 +
          ((maxDistance - distances[0]) / maxDistance) * 50 +
          (!!overlappingSchedules.length
            ? (overlappingSchedules[0].overlap / 60) * 50
            : 0);

        return {
          ...card,
          score,
          ageDiff,
          distances: distances.map((distance) => {
            if (distance / 1000 > 1)
              return (distance / 1000).toFixed(2) + ' км';
            return Math.round(distance) + ' м';
          }),
          schedules: overlappingSchedules.sort((a, b) => {
            const days = [
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ];
            return days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek);
          }),
        };
      })
      .sort((a, b) => b.score - a.score);
    res.json(scoredCards).status(200);
  }
}

export const userController = new UserController();
