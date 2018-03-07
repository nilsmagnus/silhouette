(ns silhouette.core
  (:require [figwheel.client :as fw]
            [cljs-http.client :as http]
            [sablono.core :as html :refer-macros [html]]
            [quiescent.core :as q :include-macros true]
            [quiescent.dom :as d]
                        )

(def app-state (atom {:likes 0}))

(defn like-me[data]
  (html [:div
             [:h1 "Like me a lot" (:likes @data)]
             [:div [:a {:href "#"
                        :onClick #(swap! data update-in [:likes] inc)}
                    "thumbs up"]]]))

(defn render! []
  (.render js/ReactDOM
           (like-me app-state)
           (.getElementById js/document "app")))


(add-watch app-state :on-change (fn[_ _ _ _] (render!)))

(render!)
