import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * Recebimento das infos; check
 * Tratativa de erros e excessoes; partial
 * Acesso ao repositorio; check
 */

 interface Request {
  provider: string;
  date: Date;
 }

/**
 * Dependency Inversion (SOLID)
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This time is not available');
    }

    const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

    return appointment;
  }
}

export default CreateAppointmentService;
