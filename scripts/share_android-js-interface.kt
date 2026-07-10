package com.example.testwebview

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)

        // Enable JavaScript
        webView.settings.javaScriptEnabled = true

        // Enable DOM storage
        webView.settings.domStorageEnabled = true

        // Enable console logging
        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                Log.d("WebView", "${consoleMessage?.message()} -- From line ${consoleMessage?.lineNumber()} of ${consoleMessage?.sourceId()}")
                return true
            }
        }

        // Add JavaScript interface for sharing
        webView.addJavascriptInterface(WebAppInterface(this), "AndroidShare")

        // Inject JavaScript to intercept navigator.share
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                val js = """
                    (function() {
                        // Create navigator.share if it doesn't exist
                        if (!navigator.share) {
                            navigator.share = function(data) {
                                if (window.AndroidShare) {
                                    window.AndroidShare.share(
                                        data.title || '',
                                        data.text || '',
                                        data.url || ''
                                    );
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Share not supported'));
                            };
                        } else {
                            // Override existing navigator.share
                            const originalShare = navigator.share.bind(navigator);
                            navigator.share = function(data) {
                                if (window.AndroidShare) {
                                    window.AndroidShare.share(
                                        data.title || '',
                                        data.text || '',
                                        data.url || ''
                                    );
                                    return Promise.resolve();
                                }
                                return originalShare(data);
                            };
                        }
                        console.log('Navigator.share injected successfully');
                    })();
                """.trimIndent()
                view?.evaluateJavascript(js, null)
            }
        }

        // Load the URL
        val url = "https://football-association-qa.livelikeapp.com/games/squad-selector.html"
        webView.loadUrl(url)
    }

    inner class WebAppInterface(private val activity: AppCompatActivity) {
        @JavascriptInterface
        fun share(title: String, text: String, url: String) {
            Log.d("WebView", "Share called with title: $title, text: $text, url: $url")
            activity.runOnUiThread {
                val shareIntent = Intent().apply {
                    action = Intent.ACTION_SEND
                    type = "text/plain"
                    putExtra(Intent.EXTRA_SUBJECT, title)
                    putExtra(Intent.EXTRA_TEXT, "$text $url".trim())
                }
                activity.startActivity(Intent.createChooser(shareIntent, "Share via"))
            }
        }
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}