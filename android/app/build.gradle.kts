import java.util.Properties
import java.io.FileInputStream

plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

val keystorePropertiesFile = rootProject.file("key.properties")
val keystoreProperties = Properties()
if (keystorePropertiesFile.exists()) {
    FileInputStream(keystorePropertiesFile).use { fis ->
        keystoreProperties.load(fis)
    }
}
fun envOrProp(key: String): String? = keystoreProperties.getProperty(key) ?: System.getenv(key)
val storeFilePath = envOrProp("storeFile") ?: envOrProp("KEYSTORE_FILE")
val storePasswordVal = envOrProp("storePassword") ?: envOrProp("KEYSTORE_PASSWORD")
val keyAliasVal = envOrProp("keyAlias") ?: envOrProp("KEY_ALIAS")
val keyPasswordVal = envOrProp("keyPassword") ?: envOrProp("KEY_PASSWORD")
val hasSigning = listOf(storeFilePath, storePasswordVal, keyAliasVal, keyPasswordVal).all { it != null }

android {
    namespace = "com.example.bazi_fortune_app"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_11.toString()
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.bazi_fortune_app"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    signingConfigs {
        if (hasSigning) {
            create("release") {
                storeFile = file(storeFilePath!!)
                storePassword = storePasswordVal!!
                keyAlias = keyAliasVal!!
                keyPassword = keyPasswordVal!!
            }
        }
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = if (hasSigning) {
                signingConfigs.getByName("release")
            } else {
                signingConfigs.getByName("debug")
            }
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

dependencies {
    // Fix R8 missing classes for Flutter deferred components (Play Store split install)
    implementation("com.google.android.play:core:1.10.3")
}

flutter {
    source = "../.."
}
