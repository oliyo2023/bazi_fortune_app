# 可选：需要系统装有 make
# Windows 上建议优先使用 scripts/build.ps1

.PHONY: apk-arm64 apk-all aab clean

apk-arm64:
	@cd fronted && flutter clean && flutter pub get && \
	flutter build apk --release --split-per-abi --target-platform=android-arm64 --obfuscate --split-debug-info=build/symbols --tree-shake-icons

apk-all:
	@cd fronted && flutter clean && flutter pub get && \
	flutter build apk --release --split-per-abi --target-platform=android-arm,android-arm64 --obfuscate --split-debug-info=build/symbols --tree-shake-icons

aab:
	@cd fronted && flutter clean && flutter pub get && \
	flutter build appbundle --release --obfuscate --split-debug-info=build/symbols --tree-shake-icons

clean:
	@cd fronted && flutter clean