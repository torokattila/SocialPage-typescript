import Like from '../entities/Like';
import { getConnection, getRepository } from 'typeorm';

export const getLikesRepository = () => getConnection().getRepository(Like);