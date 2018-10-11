@echo off
echo exercise links: > links_actividad.txt
for %%i in (*.html) DO echo ^<article style="display: none"  data-resourcetype="exercise"^>^<a href="../ejercicios/%%i"^>Activitat ^</a^>^</article^> >> links_actividad.txt

