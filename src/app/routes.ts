import { createBrowserRouter } from "react-router";
import { Root } from "./root";
import { Home } from "./pages/Home";
import { RegularLanguage } from "./pages/RegularLanguage";
import { ContextFreeLanguage } from "./pages/ContextFreeLanguage";
import { ContextSensitiveLanguage } from "./pages/ContextSensitiveLanguage";
import { RecursivelyEnumerableLanguage } from "./pages/RecursivelyEnumerableLanguage";
import { Classifier } from "./pages/Classifier";
import { DFAVisualizer } from "./pages/DFAVisualizer";
import { Quiz } from "./pages/Quiz";
import { Chatbot } from "./pages/Chatbot";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "languages/regular", Component: RegularLanguage },
      { path: "languages/context-free", Component: ContextFreeLanguage },
      { path: "languages/context-sensitive", Component: ContextSensitiveLanguage },
      { path: "languages/recursively-enumerable", Component: RecursivelyEnumerableLanguage },
      { path: "classifier", Component: Classifier },
      { path: "dfa-visualizer", Component: DFAVisualizer },
      { path: "quiz", Component: Quiz },
      { path: "chatbot", Component: Chatbot },
    ],
  },
]);
