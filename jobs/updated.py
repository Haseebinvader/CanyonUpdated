from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler

from .jobs import sehedule_api


def start():
    scheduler = BackgroundScheduler()

    # scheduler.add_job(sehedule_api, 'cron', day='*', hour='0', minute='0')
    # scheduler.add_job(sehedule_api)
    # scheduler.start()

    # # Manually trigger the job

    # sehedule_api()


# Call the start function to begin scheduling the job

start()