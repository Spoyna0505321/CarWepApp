import { Link } from 'react-router-dom';
import { LoginForm } from "../components/LoginForm";
import { useTranslation } from "react-i18next";
export function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full justify-between flex-grow">
      <div>
        <LoginForm />
      </div>
      <div className="mt-8 text-center border-t border-white/10 pt-6">
        <p className="text-xs tracking-wider text-gray-400 uppercase">
           {t("auth.login.noAccount")}{" "}
          <Link to="/auth/register" className="text-white font-semibold underline underline-offset-4 hover:text-gray-200 transition-colors">
            {t("auth.login.createAccount")}
          </Link>
        </p>
      </div>

    </div>
  );
}
