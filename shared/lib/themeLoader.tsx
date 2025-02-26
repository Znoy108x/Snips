import { loader } from "@monaco-editor/react";
import { monacoThemes } from "@/app/(main)/_components/drop-downs/themeData"

const defineTheme = (theme: string) => {
    return new Promise((res: Function) => {
        Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${monacoThemes[theme as keyof typeof monacoThemes]}.json`),
        ]).then(([monaco, themeData]) => {
            monaco.editor.defineTheme(theme, themeData);
            res();
        });
    });
};

export { defineTheme };