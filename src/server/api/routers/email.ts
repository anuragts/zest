// import { Resend } from 'resend';

// const resend = new Resend('re_6Zrqi5tD_2Rv2LAMGShz8cR1nFh4HmvwH');

// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'anuragsharma011011@gmail.com',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });

import { z } from "zod";
import { env } from "@/env";
import {Resend} from 'resend';

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const resend = new Resend(env.RESEND_KEY);

export const emailRouter = createTRPCRouter({
  send: publicProcedure
    .input(z.object({ to: z.string(), subject: z.string(), html: z.string() }))
    .mutation(async ({ input }) => {
        resend.emails.send({
            from:"onboarding@resend.dev",
            to: input.to,
            subject: input.subject,
            html: input.html
        })
    }),
});
