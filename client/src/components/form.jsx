
import React from "react";

function Form() {
  return (
    <div className="footer">
          
            <h2>Patient Dashboard</h2>
      </div>

      <br>
      <div class="container align-items-center">
          <div class="row">

            <div class="container d-flex align-items-center no-padding">
                    <div class="col walletcard">
                      <div class="row justify-content-center">
                        <div class="col-lg-9">
                          <div class="card bg-secondary z-depth-3">
                            <div class="card-body">

                              <center>

                                <br>



                              </center>
                              <div class="container">
                                <p><h4>Identity Details:-</h4></p>

                                <form class="form-secondary">

                                  <div class="form-group">
                                    <input type="text" class="form-control " id="patient_name" placeholder="Patient Name">
                                  </div>

                                  <div class="form-group">
                                    <input type="text" class="form-control" id="patient_id_no" placeholder="Patient Identification Number">
                                  </div>

                                  <div class="form-group">
                                      <label>Patient Address</label>
                                      <textarea class="form-control" id="patient_address" placeholder="Block/Area/City/State/Pincode" rows="3" resize="none"></textarea>
                                  </div>

                                  <div class="form-group">
                                    <input type="tel" class="form-control " id="patient_phno" placeholder="Patient Phone Number">
                                  </div>

                                  <div class="form-group">
                                    <label for="file-1">Upload Your Identity Card :-</label>
                                    <div class="fileupload">

                                        <input type="file" name="file-1[]" id="file-1" class="custom-input-file" data-multiple-caption="{count} files selected" multiple />
                                        <label for="file-1">
                                            <i class="fa fa-upload"></i>
                                            <span>Choose a file…</span>
                                        </label>
                                    </div>
                                  </div>
                                  <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="Consentcheck" data-toggle="modal" data-target="#Consentcheckmod">
                                    <label class="custom-control-label" for="Consentcheck">I consent to teletest and pay , report to public health  for 6 months and I am aware and agree that i can remove my consent at any time, after which no details will be shared to public health.</label>
                                  </div>

                                  <!-- Consent Modal -->
                                    <div class="modal modal-secondary fade" id="Consentcheckmod" tabindex="-1" role="dialog" aria-labelledby="Consentcheckmodal" aria-hidden="true">
                                      <div class="modal-dialog" role="document">
                                          <div class="modal-content">
                                              <div class="modal-header">
                                                  <h5 class="modal-title" id="modal_title_6">Terms and Conditions</h5>
                                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                  <span aria-hidden="true">&times;</span>
                                                  </button>
                                              </div>
                                              <div class="modal-body">
                                                  <div class="py-3 text-center">
                                                      <i class="fas fa-exclamation-circle fa-4x"></i>

                                                  </div>

                                                  <div class="py-3">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </p>
                                                  </div>
                                              </div>
                                              <div class="modal-footer">
                                                  <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">No Thanks</button>
                                                  <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">I Accept</button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <!-- Modal ends -->
                                  <button type="submit" class="btn btn-md bg-primary mt-4 text-white">Save Changes</button>

                                </form>


                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
          
          </div>
  );
}
export default Form;