import express, { Router } from 'express';
import { nextOnError } from '../../middleware';

const router = Router();

router.get('/docs', nextOnError(express.static(`${__dirname}/../../../docs`)));

export default router;
