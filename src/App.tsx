import { AddCircle24Regular, Calculator24Regular } from "@fluentui/react-icons";
import { MultiElo } from "multi-elo";
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

const startRating = 1000;
const startDifference = 16;

export const App: FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { name: "Team A", rating: "1000", order: "1" },
    { name: "Team B", rating: "1000", order: "2" },
  ]);
  const [outputTeams, setOutputTeams] = useState<OutputTeam[]>([
    {
      name: "Team A",
      rating: startRating,
      newRating: startRating + startDifference,
    },
    {
      name: "Team B",
      rating: startRating,
      newRating: startRating - startDifference,
    },
  ]);

  const addTeam = (): void => {
    const maxOrder = Math.max(
      ...teams.map((team) => Number.parseInt(team.order, 10))
    );
    setTeams([
      ...teams,
      { name: "", rating: "", order: (maxOrder + 1).toString() },
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
    <div className="bg-bg min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold mt-20 mb-4">Multi-Elo Demo</h1>
      <p className="mb-8 text-center">
        This website showcases the functionality offered by my{" "}
        <a
          href="https://www.npmjs.com/package/multi-elo"
          className="text-accent"
        >
          multi-elo npm package.
        </a>
      </p>

      <InputTable teams={teams} setTeams={setTeams} />
      <div className="flex my-6">
        <Button className="mr-8" onClick={addTeam}>
          <AddCircle24Regular className="h-8 w-8" />
          <span className="ml-1 text-xl">Add Team</span>
        </Button>
        <Button primary onClick={calculate}>
          <Calculator24Regular className="h-8 w-8 fill-accent-font" />
          <span className="ml-1 text-xl text-accent-font">Calculate</span>
        </Button>
      </div>
      <OutputTable teams={outputTeams} />
      <div className="w-full h-8"></div>
    </div>
  );
};
