package com.eduwebparents;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.keyee.pdfview.PDFView;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.rnfs.RNFSPackage;
import com.fileopener.FileOpenerPackage;
import com.microsoft.codepush.react.CodePush;
//import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
//import com.keyee.pdfview.PDFView;
//import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

//import com.rnfs.RNFSPackage;
//import com.fileopener.FileOpenerPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
/*
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
*/
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeOneSignalPackage(),
            new VectorIconsPackage(),
            new PDFView(),
              new RNHTMLtoPDFPackage(),
            new RNFSPackage(),
            new FileOpenerPackage(),
              new RNFetchBlobPackage(),
        new CodePush(null, getApplicationContext(), BuildConfig.DEBUG)
            //new RNHTMLtoPDFPackage(),
            //new PDFView()
            //new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            //new RNFSPackage(),
            //new FileOpenerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

}
