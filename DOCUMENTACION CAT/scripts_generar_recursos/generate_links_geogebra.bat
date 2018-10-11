@echo off
echo Geogebra links: > links_geogebra.txt
for /D %%v in (*) do (
	for %%i in (%%v/material*.html) do echo ^<figure style="display:none" data-thumb="GEOGEBRA/%%v/Default.png" data-title=""^> ^<a href="../GEOGEBRA/%%v/%%i"^>^</a^> ^</figure^> >> links_geogebra.txt
)