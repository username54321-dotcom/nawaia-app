import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { app } from './clients/hono.ts';
import axios from 'axios';

app.get('/', async (ctx) => {
  console.log('received');
  const headers = ctx.req.header();
  const ip = ctx.req.header('cf-connecting-ip') ?? ctx.req.header('x-forwararded-to') ?? null;

  const request = await axios.get(`https://free.freeipapi.com/api/json/${ip}`);

  if (!request) return ctx.json({ failed: true });
  const data = request.data;
  const returnObj = {
    countryCode: data.countryCode,
    countryName: data.countryName,
    cityName: data.cityName,
    regionName: data.regionName,
  };

  console.log(returnObj);
  return ctx.json(returnObj);
});

Deno.serve(app.fetch);
