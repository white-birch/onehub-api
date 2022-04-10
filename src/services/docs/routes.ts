import express, { Router } from 'express';
import { nextOnError } from '../../middleware';

const router = Router();

router.get('/', nextOnError(express.static(`${__dirname}/../../../docs`)));

export default router;
