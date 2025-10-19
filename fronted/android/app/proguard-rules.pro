# ProGuard/R8 rules for Flutter Android app (Kotlin DSL project)
# Keep Flutter and plugin entry points
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

# Keep application and MainActivity (adjust package if changed)
-keep class com.example.bazi_fortune_app.** { *; }

# Kotlin coroutines and stdlib
-keep class kotlinx.coroutines.** { *; }
-dontwarn kotlinx.coroutines.**

# Gson / Moshi / Kotlin serialization (if any)
-keep class com.google.gson.** { *; }
-dontwarn com.google.gson.**
-keep class com.squareup.moshi.** { *; }
-dontwarn com.squareup.moshi.**
-keep class kotlinx.serialization.** { *; }
-dontwarn kotlinx.serialization.**

# OkHttp/Okio (if any)
-dontwarn okhttp3.**
-dontwarn okio.**

# Google Play Core (for deferred components)
-keep class com.google.android.play.core.** { *; }
-dontwarn com.google.android.play.core.**

# Retrofit (if any)
-dontwarn retrofit2.**
-keep class retrofit2.** { *; }

# Keep annotations and metadata used by reflection
-keepattributes *Annotation*, InnerClasses, EnclosingMethod, Signature, SourceFile, LineNumberTable

# Avoid stripping ContentProviders/Services if declared in AndroidManifest
-keep class ** extends android.app.Service { *; }
-keep class ** extends android.content.ContentProvider { *; }
-keep class ** extends android.app.BroadcastReceiver { *; }
-keep class ** extends android.app.Application { *; }

# If using WebView JS interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# General: allow obfuscation but keep public APIs accessed by reflection (adjust as needed)
-keepclassmembers class ** {
    @com.google.gson.annotations.SerializedName <fields>;
}