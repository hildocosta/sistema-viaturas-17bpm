"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

// Função para verificar se o componente está montado no navegador (client-side)
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // No cliente
    () => false  // No servidor (SSR)
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  // Enquanto estiver renderizando no servidor, exibe um esqueleto/espaçador
  if (!isMounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 text-xs font-medium cursor-pointer"
      title={isDark ? "Alternar para Modo Claro" : "Alternar para Modo Escuro"}
    >
      {isDark ? (
        <>
          <Sun size={16} className="text-amber-400" />
          <span className="hidden md:inline">Modo Claro</span>
        </>
      ) : (
        <>
          <Moon size={16} className="text-slate-700" />
          <span className="hidden md:inline">Modo Escuro</span>
        </>
      )}
    </button>
  );
}