import { GetFeedAmountResDto } from './dto/response/get-feed-amount.dto';

import * as FeedRepository from '@feed/repository/feed.repository';
import { app } from '@src/app';
import { ResultCode } from '@common/index';
import request from 'supertest';
import { Feed } from '@feed/model/feed.entity';

describe('Calculator API Test', () => {
  describe('GET /calculator 는 ', () => {
    describe('성공시', () => {
      describe('kcal 정보가 있다면', () => {
        test('kcal 정보가 있다면, 주어진 정보로 rer/der/amount를 계산한 뒤, 200과 함께 응답한다.', (done) => {
          request(app)
            .get('/calc?weight=2&birthday=2022-07-30&kcal=4073&energyRequirements=2.5')
            .then((res) => {
              //* confirm expected value
              expect(res.statusCode).toStrictEqual(200);
              expect(res.body.data.info).toStrictEqual(resGetFeedDtoKcal);
              done();
            });
        });
      });

      describe('feed id 정보가 있다면', () => {
        beforeAll(() => {
          //* Mocking
          jest.spyOn(FeedRepository.default.prototype, 'findOneKcal').mockResolvedValueOnce(mockRepositoryFindOneKcal);
        });

        test('feed id로 사료 kcal와 주어진 정보로 rer/der/amount를 계산한 뒤, 200과 함께 응답한다.', (done) => {
          request(app)
            .get('/calc?weight=2&birthday=2022-07-30&feedId=1&energyRequirements=2.5')
            .then((res) => {
              //* confirm expected value
              expect(res.statusCode).toStrictEqual(200);
              expect(res.body.data.info).toStrictEqual(resGetFeedDtoFeedId);
              done();
            });
        });
      });
    });

    describe('실패시', () => {
      test('parameter가 올바르지 않으면 400을 응답한다.', (done) => {
        request(app)
          .get('/calc?weight=a&birthday=2022-07-30&feedId=1&energyRequirements=2.5')
          .then((res) => {
            //* confirm expected value
            expect(res.statusCode).toStrictEqual(400);
            expect(res.body.error.code).toStrictEqual(ResultCode.INVALID_PARAM.code);
            done();
          });
      });

      describe('feedId가 존재하지 않는 경우', () => {
        beforeAll(() => {
          //* Mocking
          jest.spyOn(FeedRepository.default.prototype, 'findOneKcal').mockResolvedValueOnce(null);
        });

        test('404을 응답한다.', (done) => {
          request(app)
            .get('/calc?weight=2&birthday=2022-07-30&feedId=999&energyRequirements=2.5')
            .then((res) => {
              //* confirm expected value
              expect(res.statusCode).toStrictEqual(404);
              expect(res.body.error.code).toStrictEqual(ResultCode.NOT_FOUND.code);
              done();
            });
        });
      });

      describe('database 에러가 발생하는 경우', () => {
        beforeAll(() => {
          //* Mocking
          jest.spyOn(FeedRepository.default.prototype, 'findOneKcal').mockRejectedValueOnce({});
        });

        test('500을 응답한다.', (done) => {
          request(app)
            .get('/calc?weight=2&birthday=2022-07-30&feedId=1&energyRequirements=2.5')
            .then((res) => {
              //* confirm expected value
              expect(res.statusCode).toStrictEqual(500);
              expect(res.body.error.code).toStrictEqual(ResultCode.DB_ERROR.code);
              done();
            });
        });
      });
    });
  });
});

// * Common Request and Response

const resGetFeedDtoKcal: GetFeedAmountResDto = {
  rer: 118,
  der: 295,
  amount: 72,
};

const resGetFeedDtoFeedId: GetFeedAmountResDto = {
  rer: 118,
  der: 295,
  amount: 79,
};

const mockRepositoryFindOneKcal = {
  kcal: 3744,
} as Feed;
