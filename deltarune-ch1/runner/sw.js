const GAME_NAME = "export";
const GAME_VERSION = "1.0.0.0";

const CACHE_NAME = JSON.stringify({"name": GAME_NAME, "version": GAME_VERSION});
const CACHE_FILES = ["runner.data",
"runner.js",
"runner.wasm",
"audio-worklet.js",
"audio_intronoise.ogg",
"snd_revival.ogg",
"snd_closet_fall.ogg",
"snd_paper_rumble.ogg",
"snd_paper_surf.ogg",
"game.unx",
"snd_closet_impact.ogg",
"snd_great_shine.ogg",
"snd_rurus_appear.ogg",
"mus/spamton_neo_meeting.ogg",
"mus/home.ogg",
"mus/wind.ogg",
"mus/wind_highplace.ogg",
"mus/audio_anotherhim.ogg",
"mus/card_castle.ogg",
"mus/kingboss.ogg",
"mus/audio_darkness.ogg",
"mus/audio_defeat.ogg",
"mus/forest.ogg",
"mus/the_holy.ogg",
"mus/spamton_house.ogg",
"mus/cyber_battle.ogg",
"mus/lancer.ogg",
"mus/berdly_descend.ogg",
"mus/cybercity.ogg",
"mus/lancer_susie.ogg",
"mus/gameover_short.ogg",
"mus/bird.ogg",
"mus/mus_birdnoise.ogg",
"mus/gallery.ogg",
"mus/thrashmachine.ogg",
"mus/charjoined.ogg",
"mus/spamton_happy.ogg",
"mus/music_guys_intro.ogg",
"mus/muscle.ogg",
"mus/field_of_hopes.ogg",
"mus/spamton_meeting_intro.ogg",
"mus/queen_boss.ogg",
"mus/deep_noise.ogg",
"mus/creepydoor.ogg",
"mus/flashback_excerpt.ogg",
"mus/town.ogg",
"mus/noelle_normal.ogg",
"mus/legend.ogg",
"mus/spamton_neo_mix_ex_wip.ogg",
"mus/prejoker.ogg",
"mus/cyber_battle_end.ogg",
"mus/tense.ogg",
"mus/cyber.ogg",
"mus/cybercity_old.ogg",
"mus/queen_car_radio.ogg",
"mus/basement.ogg",
"mus/berdly_battle_heartbeat_true.ogg",
"mus/honksong.ogg",
"mus/queen.ogg",
"mus/music_guys.ogg",
"mus/friendship.ogg",
"mus/spamton_meeting.ogg",
"mus/alley_ambience.ogg",
"mus/battle.ogg",
"mus/creepylandscape.ogg",
"mus/checkers.ogg",
"mus/d.ogg",
"mus/s_neo_clip.ogg",
"mus/queen_intro.ogg",
"mus/cybershop_christmas.ogg",
"mus/berdly_audience.ogg",
"mus/mus_introcar.ogg",
"mus/cybercity_alt.ogg",
"mus/mansion_entrance.ogg",
"mus/boxing_boss.ogg",
"mus/gigaqueen_pre.ogg",
"mus/giant_queen_appears.ogg",
"mus/spamton_battle.ogg",
"mus/creepychase.ogg",
"mus/s_neo.ogg",
"mus/spamton_laugh_noise.ogg",
"mus/dontforget.ogg",
"mus/april_2012.ogg",
"mus/cyberhouse.ogg",
"mus/thrash_rating.ogg",
"mus/spamton_basement.ogg",
"mus/audio_story.ogg",
"mus/ocean.ogg",
"mus/w.ogg",
"mus/the_dark_truth.ogg",
"mus/mus_school.ogg",
"mus/coolbeat.ogg",
"mus/noelle_school.ogg",
"mus/noelle.ogg",
"mus/berdly_theme.ogg",
"mus/cyber_shop.ogg",
"mus/napsta_alarm.ogg",
"mus/alarm_titlescreen.ogg",
"mus/cyber_battle_prelude.ogg",
"mus/rouxls_battle.ogg",
"mus/fanfare.ogg",
"mus/lancerfight.ogg",
"mus/keygen.ogg",
"mus/tv_noise.ogg",
"mus/joker.ogg",
"mus/shop1.ogg",
"mus/berdly_flashback.ogg",
"mus/audio_drone.ogg",
"mus/mansion.ogg",
"mus/man.ogg",
"mus/shinkansen.ogg",
"mus/vs_susie.ogg",
"mus/acid_tunnel.ogg",
"mus/elevator.ogg",
"mus/ruruskaado.ogg",
"mus/menu.ogg",
"mus/castletown_empty.ogg",
"mus/noelle_ferriswheel.ogg",
"mus/berdly_chase.ogg",
"mus/sink_noise.ogg",
"mus/quiet_autumn.ogg",
"mus/spamton_neo_after.ogg",
"mus/dogcheck.ogg",
"mus/boxing_game.ogg",
"mus/static_placeholder.ogg",
"mus/castletown.ogg",
"mus/ch2_credits.ogg",
"mus/hip_shop.ogg"
];

self.addEventListener("fetch", (event) => {
  const should_cache = CACHE_FILES.some((f) => {
      return event.request.url.endsWith(f);
  });
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (should_cache) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.allSettled(
      keys.map((key) => {
        try {
          const data = JSON.parse(key);
          if (data && data["name"] && data.name == GAME_NAME &&
              data.version && data.version != GAME_VERSION) {
            return caches.delete(key);
          }
        } catch {
          return;
        }
      })
    )).then(() => {
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
