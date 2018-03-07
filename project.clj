(defproject hello-seymore "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.908"]
                 [quiescent "0.3.2"]
                 [cljs-http "0.1.42"]
                 [sablono "0.8.3"]]
  :plugins [[lein-figwheel "0.5.15"]]
  :clean-targets [:target-path "out"]
  :cljsbuild {
              :builds [{:id "dev"
                        :source-paths ["src"]
                        :figwheel true
                        :compiler {:main "silhouette.core"}
                        }]
              })
