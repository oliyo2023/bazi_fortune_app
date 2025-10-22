Param(
    [ValidateSet("apk-arm64", "apk-all", "aab", "clean", "apk-arm64-tag")]
    [string]$Task = "apk-arm64"
)

$ErrorActionPreference = "Stop"

function Ensure-FrontedDir {
    # Prefer reliable script-root detection
    $repoRoot = $null
    if ($PSScriptRoot) {
        # scripts/ directory -> repo root is parent
        $repoRoot = Split-Path -Parent $PSScriptRoot
    } elseif ($MyInvocation.MyCommand.Path) {
        $repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
        $repoRoot = Split-Path -Parent $repoRoot
    } else {
        # Fallback: try current location
        $repoRoot = Get-Location
    }

    if (-not $repoRoot) {
        throw "Cannot resolve repository root. Please run with: pwsh -File scripts/build.ps1"
    }

    Set-Location $repoRoot
    if (-not (Test-Path "fronted/pubspec.yaml")) {
        throw "fronted/pubspec.yaml not found. Ensure Flutter project is under 'fronted'. Current: $(Get-Location)"
    }
    Set-Location "fronted"
}

function Run-Common {
    Write-Host "==> flutter clean"
    flutter clean | Out-Host
    Write-Host "==> flutter pub get"
    flutter pub get | Out-Host
}

function Get-AppVersion {
    $pubspec = Get-Content "pubspec.yaml" -Raw
    # 匹配形如 version: 1.2.3+45
    $m = [regex]::Match($pubspec, "(?m)^\s*version\s*:\s*([^

#]+)")
    if ($m.Success) {
        return $m.Groups[1].Value.Trim()
    }
    return "0.0.0+0"
}

function Sanitize-Name([string]$name) {
    # 仅保留数字/字母/点/下划线/横线，其余替换为-
    return ($name -replace "[^0-9A-Za-z\.\-_]", "-")
}

function Build-Apk-Arm64 {
    Run-Common
    Write-Host "==> Build APK (arm64-v8a only)"
    flutter build apk --release --split-per-abi --target-platform=android-arm64 --obfuscate --split-debug-info=build/symbols --tree-shake-icons | Out-Host
    Write-Host "Output: build/app/outputs/flutter-apk/app-arm64-v8a-release.apk"
}

function Build-Apk-All {
    Run-Common
    Write-Host "==> Build APK (armeabi-v7a + arm64-v8a)"
    flutter build apk --release --split-per-abi --target-platform=android-arm,android-arm64 --obfuscate --split-debug-info=build/symbols --tree-shake-icons | Out-Host
    Write-Host "Output: build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk"
    Write-Host "Output: build/app/outputs/flutter-apk/app-arm64-v8a-release.apk"
}

function Build-Aab {
    Run-Common
    Write-Host "==> Build AAB (App Bundle)"
    flutter build appbundle --release --obfuscate --split-debug-info=build/symbols --tree-shake-icons | Out-Host
    Write-Host "Output: build/app/outputs/bundle/release/app-release.aab"
}

function Build-Apk-Arm64-Tagged {
    Run-Common
    Write-Host "==> Build APK (arm64-v8a only, with version+timestamp tag)"
    $ok = $true
    try {
        flutter build apk --release --split-per-abi --target-platform=android-arm64 --obfuscate --split-debug-info=build/symbols --tree-shake-icons | Out-Host
    } catch {
        $ok = $false
        throw
    }
    if ($ok) {
        $src = "build/app/outputs/flutter-apk/app-arm64-v8a-release.apk"
        if (-not (Test-Path $src)) {
            throw "Expected APK not found: $src"
        }
        $ver = Get-AppVersion
        $ts = Get-Date -Format "yyyyMMdd-HHmmss"
        $tag = Sanitize-Name("v$ver-$ts")
        $dst = "build/app/outputs/flutter-apk/app-arm64-v8a-release-$tag.apk"
        Copy-Item $src $dst -Force
        Write-Host "Output: $dst"
    }
}

function Clean-All {
    Write-Host "==> flutter clean"
    flutter clean | Out-Host
}

try {
    Ensure-FrontedDir
    switch ($Task) {
        "apk-arm64"     { Build-Apk-Arm64 }
        "apk-all"       { Build-Apk-All }
        "aab"           { Build-Aab }
        "apk-arm64-tag" { Build-Apk-Arm64-Tagged }
        "clean"         { Clean-All }
        default         { throw "Unknown task: $Task" }
    }
    Write-Host "Done task: $Task"
} catch {
    Write-Error $_
    exit 1
}