function countitround() {
    var glob = {
        deg: function (e) {
            return Math.PI / 180 * e - Math.PI / 180 * 90
        },
        size: {
            x: function (e) {
                return glob.settings["size" + e] / 2
            },
            y: function (e) {
                return glob.settings["size" + e] / 2
            },
            z: function (e) {
                return glob.settings["size" + e] / 2 - (Number(glob.settings["backgroundwidth" + e]) > Number(glob.settings["frontwidth" + e]) ? glob.settings["backgroundwidth" + e] : glob.settings["frontwidth" + e]) / 2 - glob.settings["glowwidth" + e]
            }
        },
        complete: function () {
            if (jQuery.trim(glob.settings.callback) != "") {
                eval(glob.settings.callback)
            }
        }
    };
    this.init = function (e) {
        glob.settings = e;
        if (glob.settings.now >= glob.settings.enddate) {
            glob.complete();
            return;
            glob.complete
        }
        glob.total = Math.floor((glob.settings.enddate - glob.settings.startdate) / 86400);
        glob.days = Math.floor((glob.settings.enddate - glob.settings.now) / 86400);
        glob.hours = 24 - Math.floor((glob.settings.enddate - glob.settings.now) % 86400 / 3600);
        glob.minutes = 60 - Math.floor((glob.settings.enddate - glob.settings.now) % 86400 % 3600 / 60);
        glob.seconds = 60 - Math.floor((glob.settings.enddate - glob.settings.now) % 86400 % 3600 % 60);
        if (jQuery("#" + glob.settings.unique).find(".countitround_days").length <= 0) {
            glob.hours = Math.floor((glob.settings.enddate - glob.settings.now) / 3600)
        }
        if (jQuery("#" + glob.settings.unique).find(".countitround_hours").length <= 0) {
            glob.minutes = Math.floor((glob.settings.enddate - glob.settings.now) / 60)
        }
        if (jQuery("#" + glob.settings.unique).find(".countitround_minutes").length <= 0) {
            glob.seconds = Math.floor(glob.settings.enddate - glob.settings.now)
        }
        clock.set.background();
        clock.set.seconds();
        clock.set.minutes();
        clock.set.hours();
        clock.set.days();
        clock.start()
    };
    var clock = {
        set: {
            background: function () {
                jQuery("#" + glob.settings.unique).find(".canvas_background").each(function () {
                    var e;
                    if (jQuery(this).parent().attr("class").indexOf("days") >= 1) e = 1;
                    if (jQuery(this).parent().attr("class").indexOf("hours") >= 1) e = 2;
                    if (jQuery(this).parent().attr("class").indexOf("minutes") >= 1) e = 3;
                    if (jQuery(this).parent().attr("class").indexOf("seconds") >= 1) e = 4;
                    var t = jQuery(this).get(0);
                    var n = t.getContext("2d");
                    n.canvas.height = glob.settings["size" + e];
                    n.canvas.width = glob.settings["size" + e];
                    n.clearRect(0, 0, t.width, t.height);
                    n.beginPath();
                    n.strokeStyle = glob.settings["backgroundcolor" + e];
                    n.arc(glob.size.x(e), glob.size.y(e), glob.size.z(e), glob.deg(0), glob.deg(360));
                    n.lineWidth = glob.settings["backgroundwidth" + e];
                    n.stroke()
                })
            },
            days: function () {
                var e = jQuery("#" + glob.settings.unique).find(".canvas_days").get(0);
                if (!e) return;
                var t = e.getContext("2d");
                t.canvas.height = glob.settings.size1;
                t.canvas.width = glob.settings.size1;
                t.clearRect(0, 0, e.width, e.height);
                t.beginPath();
                t.strokeStyle = glob.settings.color1;
                t.shadowBlur = glob.settings.glowwidth1;
                t.shadowOffsetX = 0;
                t.shadowOffsetY = 0;
                t.shadowColor = glob.settings.glow1;
                t.arc(glob.size.x(1), glob.size.y(1), glob.size.z(1), glob.deg(0), glob.deg(360 / glob.total * (glob.total - glob.days)));
                t.lineWidth = glob.settings.frontwidth1;
                t.stroke();
                jQuery("#" + glob.settings.unique).find(".countitround_days_count").text(glob.days)
            },
            hours: function () {
                var e = jQuery("#" + glob.settings.unique).find(".canvas_hours").get(0);
                if (!e) return;
                var t = e.getContext("2d");
                t.canvas.height = glob.settings.size2;
                t.canvas.width = glob.settings.size2;
                t.clearRect(0, 0, e.width, e.height);
                t.beginPath();
                t.strokeStyle = glob.settings.color2;
                t.shadowBlur = glob.settings.glowwidth2;
                t.shadowOffsetX = 0;
                t.shadowOffsetY = 0;
                t.shadowColor = glob.settings.glow2;
                var n = 15 * glob.hours;
                var r = 24 - glob.hours;
                if (jQuery("#" + glob.settings.unique).find(".countitround_days").length <= 0) {
                    n = 360 / Math.floor((glob.settings.enddate - glob.settings.startdate) / 3600) * (Math.floor((glob.settings.enddate - glob.settings.startdate) / 3600) - glob.hours);
                    r = glob.hours
                }
                t.arc(glob.size.x(2), glob.size.y(2), glob.size.z(2), glob.deg(0), glob.deg(n));
                t.lineWidth = glob.settings.frontwidth2;
                t.stroke();
                jQuery("#" + glob.settings.unique).find(".countitround_hours_count").text(r)
            },
            minutes: function () {
                var e = jQuery("#" + glob.settings.unique).find(".canvas_minutes").get(0);
                if (!e) return;
                var t = e.getContext("2d");
                t.canvas.height = glob.settings.size3;
                t.canvas.width = glob.settings.size3;
                t.clearRect(0, 0, e.width, e.height);
                t.beginPath();
                t.strokeStyle = glob.settings.color3;
                t.shadowBlur = glob.settings.glowwidth3;
                t.shadowOffsetX = 0;
                t.shadowOffsetY = 0;
                t.shadowColor = glob.settings.glow3;
                var n = 6 * glob.minutes;
                var r = 60 - glob.minutes;
                if (jQuery("#" + glob.settings.unique).find(".countitround_hours").length <= 0) {
                    n = 360 / Math.floor((glob.settings.enddate - glob.settings.startdate) / 60) * (Math.floor((glob.settings.enddate - glob.settings.startdate) / 60) - glob.minutes);
                    r = glob.minutes
                }
                t.arc(glob.size.x(3), glob.size.y(3), glob.size.z(3), glob.deg(0), glob.deg(n));
                t.lineWidth = glob.settings.frontwidth3;
                t.stroke();
                jQuery("#" + glob.settings.unique).find(".countitround_minutes_count").text(r)
            },
            seconds: function () {
                var e = jQuery("#" + glob.settings.unique).find(".canvas_seconds").get(0);
                var t = e.getContext("2d");
                t.canvas.height = glob.settings.size4;
                t.canvas.width = glob.settings.size4;
                t.clearRect(0, 0, e.width, e.height);
                t.beginPath();
                t.strokeStyle = glob.settings.color4;
                t.shadowBlur = glob.settings.glowwidth4;
                t.shadowOffsetX = 0;
                t.shadowOffsetY = 0;
                t.shadowColor = glob.settings.glow4;
                var n = 6 * glob.seconds;
                var r = 60 - glob.seconds;
                if (jQuery("#" + glob.settings.unique).find(".countitround_minutes").length <= 0) {
                    n = 360 / Math.floor(glob.settings.enddate - glob.settings.startdate) * (Math.floor(glob.settings.enddate - glob.settings.startdate) - glob.seconds);
                    r = glob.seconds
                }
                t.arc(glob.size.x(4), glob.size.y(4), glob.size.z(4), glob.deg(0), glob.deg(n));
                t.lineWidth = glob.settings.frontwidth4;
                t.stroke();
                jQuery("#" + glob.settings.unique).find(".countitround_seconds_count").text(r)
            }
        },
        start: function () {
            var e;
            if (jQuery("#" + glob.settings.unique).find(".countitround_minutes").length <= 0) {
                e = setInterval(function () {
                    if (glob.seconds <= 0) {
                        glob.complete();
                        clearInterval(e);
                        return
                    } else {
                        glob.seconds--
                    }
                    clock.set.seconds()
                }, 1e3);
                return
            }
            if (jQuery("#" + glob.settings.unique).find(".countitround_hours").length <= 0) {
                e = setInterval(function () {
                    if (glob.seconds > 59) {
                        if (glob.minutes == 0) {
                            clearInterval(e);
                            glob.complete();
                            return
                        }
                        glob.seconds = 1;
                        glob.minutes--;
                        clock.set.minutes()
                    } else {
                        glob.seconds++
                    }
                    clock.set.seconds()
                }, 1e3);
                return
            }
            if (jQuery("#" + glob.settings.unique).find(".countitround_days").length <= 0) {
                e = setInterval(function () {
                    if (glob.seconds > 59) {
                        if (60 - glob.minutes <= 0 && glob.hours <= 0) {
                            clearInterval(e);
                            glob.complete();
                            return
                        }
                        glob.seconds = 1;
                        if (glob.minutes > 59) {
                            glob.minutes = 1;
                            clock.set.minutes();
                            glob.hours--;
                            clock.set.hours()
                        } else {
                            glob.minutes++
                        }
                        clock.set.minutes()
                    } else {
                        glob.seconds++
                    }
                    clock.set.seconds()
                }, 1e3);
                return
            }
            e = setInterval(function () {
                if (glob.seconds > 59) {
                    if (60 - glob.minutes <= 0 && 24 - glob.hours <= 0 && glob.days <= 0) {
                        clearInterval(e);
                        glob.complete();
                        return
                    }
                    glob.seconds = 1;
                    if (glob.minutes > 59) {
                        glob.minutes = 1;
                        clock.set.minutes();
                        if (glob.hours > 23) {
                            glob.hours = 1;
                            if (glob.days > 0) {
                                glob.days--;
                                clock.set.days()
                            }
                        } else {
                            glob.hours++
                        }
                        clock.set.hours()
                    } else {
                        glob.minutes++
                    }
                    clock.set.minutes()
                } else {
                    glob.seconds++
                }
                clock.set.seconds()
            }, 1e3)
        }
    }
}
jQuery(document).ready(function () {
    var e = 0;
    while (countitroundinstance[e]) {
        (new countitround).init(countitroundinstance[e]);
        e++
    }
})
