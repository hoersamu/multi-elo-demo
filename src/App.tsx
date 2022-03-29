import { AddCircle24Regular, Calculator24Regular } from "@fluentui/react-icons";
import { getNewRatings, MultiElo } from "multi-elo";
import React, { FC, useState } from "react";
import { Button } from "./components/button/Button";
import { InputTable } from "./components/inputTable/InputTable";
import { OutputTable } from "./components/outputTable/OutputTable";

export type Team = {
  name: string;
  rating: string;
  order: string;
};

export type OutputTeam = {
  name: string;
  rating: number;
  newRating: number;
};

export const App: FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { name: "Team A", rating: "1000", order: "1" },
    { name: "Team B", rating: "1000", order: "2" },
  ]);
  const [outputTeams, setOutputTeams] = useState<OutputTeam[]>([
    { name: "Team A", rating: 1000, newRating: 1016 },
    { name: "Team B", rating: 1000, newRating: 984 },
  ]);

  const addTeam = (): void => {
    setTeams([
      ...teams,
      { name: "", rating: "", order: (teams.length + 1).toString() },
    ]);
  };

  const calculate = (): void => {
    const newScores = new MultiElo().getNewRatings(
      teams.map((team) => Number.parseFloat(team.rating)),
      teams.map((team) => Number.parseInt(team.order, 10))
    );

    setOutputTeams(
      teams.map(
        (team, index): OutputTeam => ({
          name: team.name,
          rating: Number.parseFloat(team.rating),
          newRating: newScores[index],
        })
      )
    );
  };

  return (
    <div className="App bg-bg h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold mt-20 mb-4">Multi-Elo Demo</h1>
      <p className="mb-8">
        This website showcases the functionality offered by my{" "}
        <a href="https://www.npmjs.com/package/multi-elo">
          multi-elo npm package.
        </a>
      </p>

      <InputTable teams={teams} setTeams={setTeams} />
      <div className="flex">
        <Button className="mt-2" onClick={addTeam}>
          <AddCircle24Regular />
          <span className="ml-1">Add Team</span>
        </Button>
        <Button className="mt-2" onClick={calculate}>
          <Calculator24Regular />
          <span className="ml-1">Calculate</span>
        </Button>
      </div>
      <OutputTable teams={outputTeams} />
    </div>
  );
};
