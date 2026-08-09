import { Link } from 'react-router-dom';
import { RegisterForm } from "../components/RegisterForm";
import { useTranslation } from 'react-i18next';
export function RegisterPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full justify-between flex-grow">
      <div>
        <RegisterForm />
      </div>
      <div className="mt-8 text-center border-t border-white/10 pt-6">
        <p className="text-xs tracking-wider text-gray-400 uppercase">
           {t("auth.register.hasAccount")}{" "}
          <Link to="/auth/login" className="text-white font-semibold underline underline-offset-4 hover:text-gray-200 transition-colors">
             {t("auth.register.login")}
          </Link>
        </p>
      </div>

    </div>
  );
}
