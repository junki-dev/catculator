import { Feed } from '../model/feed.entity';

import { Database } from '@loader/index';
import { DataSource, Repository } from 'typeorm';

class FeedRepository {
  readonly #database: DataSource;
  readonly #repository: Repository<Feed>;

  constructor() {
    this.#database = Database.getDatasource();
    this.#repository = this.#database.getRepository(Feed);
  }

  getRepository() {
    if (this.#repository) return this.#repository;

    return this.#database.getRepository(Feed);
  }

  findAll() {
    return this.#repository.find();
  }

  async findOneKcal(id: number) {
    return await this.#repository.findOne({
      select: {
        kcal: true,
      },
      where: {
        id,
      },
    });
  }
}

export default FeedRepository;
