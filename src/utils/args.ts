import { Command } from "commander";
import { PROJECT_NAME, PROJECT_DESCRIPTION } from "@/constants.js";

import { sharedState } from "@/state/shared.state.js";

import pak from "../../package.json" with { type: "json" };

const program = new Command(PROJECT_NAME);
program.name(PROJECT_NAME).description(PROJECT_DESCRIPTION).version(pak.version);

// options
// (-h, --help) and (-V, --version) is already added automatically in commander
program.option("-y, --yes", "Skip confirmation prompts");

// arguments
// NOTE: write arguments from here

program.parse();

const options = program.opts() as { yes?: boolean };

if (options.yes) {
  sharedState.setSkipConfirm(options.yes);
}
