import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Team from "./Team";
import Agenda from "./Agenda";
import Registration from "./Registration";
import ThankYou from "./ThankYou";
import PrivacyPolicy from "./PrivacyPolicy"
import TermsOfService from "./TermsOfService";
import ThankYouPage  from "./components/ThankyouPage";
import FeedbackForm from "./components/Feedback";
import FeedbackSubmitted from "./FeedbackSubmit";
import RedesignAI from "./RedesignAI";
import IntakeForm from "./IntakeForm";
import Admin from "./Admin";
import Partners from "./Partners";
import Participants from "./Participants";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/" element={<ThankYouPage />} /> */}
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/team" element={<Team />} />
      {/* <Route path="/agenda" element={<Agenda />} /> */}
      <Route path="/registration" element={<Registration />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/feedback-submitted" element={<FeedbackSubmitted />} />
      <Route path="/redesign-ai" element={<RedesignAI />} />
      <Route path="/redesign-ai/intake" element={<IntakeForm />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/participants" element={<Participants />} />
    </Routes>
  );
}
