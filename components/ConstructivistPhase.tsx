"use client";

import { Network, UsersRound } from "lucide-react";
import type { ActivityData } from "@/types/activity";
import {
  Badge,
  FieldShell,
  OptionToggle,
  TextArea,
  TextInput
} from "@/components/FormElements";
import { toggleInArray } from "@/lib/utils";

type ConstructivistPhaseProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const actorOptions = [
  "UN Police patrol",
  "IDP community",
  "host community",
  "local police",
  "women and children",
  "mission leadership",
  "humanitarian actors",
  "unknown armed/criminal actors",
  "other"
];

const outputOptions = [
  "COA brief",
  "risk matrix",
  "patrol response plan",
  "stakeholder map",
  "reporting template",
  "role-play response",
  "other"
];

export function ConstructivistPhase({
  data,
  updateData
}: ConstructivistPhaseProps) {
  const updateConstructivist = (
    patch: Partial<ActivityData["constructivist"]>
  ) => {
    updateData({
      constructivist: {
        ...data.constructivist,
        ...patch
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <Badge>Constructivist</Badge>
        <h2 className="mt-3 text-3xl font-bold text-navy-900">
          Phase 3 — Constructivist Learning: Build the Solution
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
          Constructivist learning works well for complex mission problems.
          Learners use their experience, discuss the scenario, and build a
          solution together.
        </p>
      </div>

      <div className="rounded-2xl border border-un-line bg-un-light p-6">
        <div className="flex items-center gap-3">
          <Network className="text-un-blue" size={24} aria-hidden />
          <h3 className="text-2xl font-bold text-navy-900">Group task</h3>
        </div>
        <p className="mt-3 text-xl leading-9 text-navy-900">
          Analyze the mission scenario and design a group-based learning
          activity. Use your operational experience, but convert it into a
          trainable activity for newly deployed officers.
        </p>
      </div>

      <section className="grid gap-6">
        <FieldShell label="1. What is the main problem in the scenario?">
          <TextArea
            value={data.constructivist.mainProblem}
            onChange={(mainProblem) => updateConstructivist({ mainProblem })}
            placeholder="Example: safety risks and community mistrust are reinforcing each other."
          />
        </FieldShell>

        <div>
          <div className="flex items-center gap-3">
            <UsersRound className="text-un-blue" size={22} aria-hidden />
            <h3 className="text-xl font-bold text-navy-900">
              2. Who are the key actors?
            </h3>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {actorOptions.map((actor) => (
              <OptionToggle
                key={actor}
                label={actor}
                selected={data.constructivist.actors.includes(actor)}
                onClick={() =>
                  updateConstructivist({
                    actors: toggleInArray(data.constructivist.actors, actor)
                  })
                }
              />
            ))}
          </div>
          {data.constructivist.actors.includes("other") ? (
            <div className="mt-4 max-w-xl">
              <FieldShell label="Other actor">
                <TextInput
                  value={data.constructivist.otherActor}
                  onChange={(otherActor) => updateConstructivist({ otherActor })}
                  placeholder="Specify other actor"
                />
              </FieldShell>
            </div>
          ) : null}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <FieldShell label="3. What scenario question will you give trainees?">
            <TextArea
              value={data.constructivist.scenarioQuestion}
              onChange={(scenarioQuestion) =>
                updateConstructivist({ scenarioQuestion })
              }
              placeholder="Example: How should the patrol respond in the first 30 minutes without increasing risk or damaging community trust?"
            />
          </FieldShell>
          <FieldShell label="4. What group task will trainees complete?">
            <TextArea
              value={data.constructivist.groupTask}
              onChange={(groupTask) => updateConstructivist({ groupTask })}
              placeholder="Example: propose a patrol response plan including safety, engagement, reporting, and coordination."
            />
          </FieldShell>
        </div>

        <div>
          <h3 className="text-xl font-bold text-navy-900">
            5. What output will trainees produce?
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outputOptions.map((output) => (
              <OptionToggle
                key={output}
                label={output}
                selected={data.constructivist.outputs.includes(output)}
                onClick={() =>
                  updateConstructivist({
                    outputs: toggleInArray(data.constructivist.outputs, output)
                  })
                }
              />
            ))}
          </div>
          {data.constructivist.outputs.includes("other") ? (
            <div className="mt-4 max-w-xl">
              <FieldShell label="Other output">
                <TextInput
                  value={data.constructivist.otherOutput}
                  onChange={(otherOutput) => updateConstructivist({ otherOutput })}
                  placeholder="Specify other output"
                />
              </FieldShell>
            </div>
          ) : null}
        </div>

        <FieldShell label="6. What is the expected learning point?">
          <TextArea
            value={data.constructivist.expectedLearningPoint}
            onChange={(expectedLearningPoint) =>
              updateConstructivist({ expectedLearningPoint })
            }
            placeholder="Example: complex mission problems require safety, communication, coordination, and respect for the community."
          />
        </FieldShell>
      </section>
    </div>
  );
}
