//
//  SleepGuideWidgetBundle.swift
//  SleepGuideWidget
//
//  Created by Simon Schroder Lopes on 27/07/25.
//

import WidgetKit
import SwiftUI

@main
struct SleepGuideWidgetBundle: WidgetBundle {
    var body: some Widget {
        SleepGuideWidget()
        SleepGuideWidgetControl()
    }
}
