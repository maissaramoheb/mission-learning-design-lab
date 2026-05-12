import type { AppMode } from "@/types/activity";

export const PREPARED_BY = "Prepared by Lt. Col. / Maissara Selim";
export const LIVE_WORKSPACE_URL = "https://mission-learning-design-lab.vercel.app/";

export const modeContent: Record<
  AppMode,
  {
    appTitle: string;
    subtitle: string;
    tagline: string;
    productCredit: string;
    presentationTitleLine: string;
    commandLabel: string;
  }
> = {
  learning: {
    appTitle: "Mission Learning Design Lab",
    subtitle:
      "One mission scenario. Three learning theories. One professional training response.",
    tagline:
      "Facts need clarity. Skills need modelling. Complex mission problems need judgment.",
    productCredit:
      "Mission Learning Design Lab | Prepared by Lt. Col. / Maissara Selim",
    presentationTitleLine:
      "One Mission. Three Learning Theories. One Training Response.",
    commandLabel: "UN Mission Operations Board"
  },
  evaluation: {
    appTitle: "Evaluation Design Operations Lab",
    subtitle: "From Learning Objectives to Application Evidence",
    tagline:
      "Level 3 evaluation asks: did learning transfer into observable job behaviour?",
    productCredit:
      "Evaluation Design Operations Lab | Prepared by Lt. Col. / Maissara Selim",
    presentationTitleLine: "From Learning Objectives to Application Evidence",
    commandLabel: "Evaluation Tactical Operations Room"
  }
};

export const APP_TITLE = modeContent.learning.appTitle;
export const PRODUCT_CREDIT = modeContent.learning.productCredit;
export const MAIN_TAGLINE = modeContent.learning.tagline;
export const PRESENTATION_TITLE_LINE = modeContent.learning.presentationTitleLine;
