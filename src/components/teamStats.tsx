import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Hero } from "../types/interfaces";
import { Stats } from "../types/interfaces";
import StatsTable from "./Table";

type StatsKeys = keyof Stats;

export default function TeamStatsTable() {
  let team = useSelector((state: RootState) => state.team.team);
  let [stats, setStats] = useState<Stats>();
  console.log(stats);
  useEffect(() => {
    let stats = {
      intelligence: "0",
      strength: "0",
      speed: "0",
      durability: "0",
      power: "0",
      combat: "0",
    };
    const sumObjectsByKey = (objs: Hero[]) => {
      const res = objs.reduce((a, b) => {
        let power = b.powerstats;
        let k: StatsKeys;
        for (k in power) {
          let result: number = parseInt(a[k]) + parseInt(power[k]);
          a[k] = result.toString();
        }
        return a;
      }, stats);
      return res;
    };
    let powerstats = sumObjectsByKey(team);
    setStats(powerstats);
  }, [team]);
  return <>{stats ? <StatsTable stats={stats} /> : null}</>;
}
