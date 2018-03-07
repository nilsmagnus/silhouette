(ns silhouette.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [figwheel.client :as fw]
            [cljs-http.client :as http]
            [sablono.core :as html :refer-macros [html]]
            [quiescent.core :as q :include-macros true]
            [cljs.core.async :refer [<!]]
            [quiescent.dom :as d]
            )
  )


(defonce world (atom {
                      :packageNumber ""
                      :parcels       [
                                      {:id "" :brand ""}
                                      ]
                      })
  )


(defn addSentence
  [response]
  (swap! world assoc :parcels  [{
                                 :id (:ShipmentNumber response)
                                 :status (:LatestCheckpointDescription response)
                                 :date (:LastUpdateTime response)
                                 :brand (:Provider response)}
                                ]))

(defn updatePackageNumber
  ([packageNumber]
   (.log js/console packageNumber)
   (swap! world assoc :packageNumber packageNumber)
   )
  )

(q/defcomponent InputPanel
  [data]
  (d/div {:className "input-panel"}
         (d/input {:className "input-text"
                   :type      "text"
                   :value     (:packageNumber data)
                   :onChange  (fn [e] (updatePackageNumber e.target.value))
                   })
         (d/button
          {
           :onClick   (fn [e] (addSentence (:sentence data)))
           :className "input-button"
           } "Add me"
             )
         )
  )

(q/defcomponent ParcelItem [item]
  (d/li {:className "parcel-item"}
        (d/span {} (:id item))
        (d/span {} " - ")
        (d/span {} (:brand item))
        (d/div {} (:date item))
        (d/div {} (:status item))
        )
  )

(q/defcomponent ParcelList
  [data]
  (d/div {:className "parcel-list"}
         (map ParcelItem (:parcels data))
         )
  )

(q/defcomponent Root
  [data]
  (d/div {:className "app-container"}
         (d/span {:className "title"} "Silhouette Words")
         (InputPanel data)
         (ParcelList data)
         )
  )

(defn render [parcels]
  (q/render (Root parcels)
            (.getElementById js/document "app")))

(add-watch world ::render
           (fn [_ _ _ parcels] (render parcels)))

(fw/watch-and-reload :jsload-callback
                     (fn [] (swap! world update-in [:tmp-dev] not)))

(defonce dev-hotload (render @world))
