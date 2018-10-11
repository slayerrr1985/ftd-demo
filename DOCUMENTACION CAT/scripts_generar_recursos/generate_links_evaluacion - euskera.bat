@echo off
echo exercise links: > links_eval.txt
for %%i in (*.html) DO echo ^<article style="display: none"  data-resourcetype="exercise"^>^<a href="../ejercicios/%%i"^>ebaluazioa ^</a^>^</article^> >> links_eval.txt

